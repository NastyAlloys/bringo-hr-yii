/**
 * Created by Andrey_Egorov on 03.10.14.
 */

(function() {

window.onload = function() {
    TimeSheetApp && TimeSheetApp.init();
};

var now = new Date();
var currMonth = now.getMonth() + 1;
var currYear = now.getFullYear();
var days = new Date(currYear, currMonth, 0).getDate();

function checkToday(day) {
    var date = new Date(currYear, currMonth - 1, day);
    var dayToCheck = date.getDay();
    var dayVal = "";
    if (dayToCheck !== 6 && dayToCheck !== 0) {
        dayVal = "Я";
    } else {
        dayVal = "";
    }
    return dayVal;
}

var handsontable2csv = {
    string: function(instance) {
        var headers = instance.getColHeader();

        var csv = "sep=;\n"
        csv += headers.join(";") + "\n";

        for (var i = 0; i < instance.countRows(); i++) {
            var row = [];
            for (var h in headers) {
                var prop = instance.colToProp(h)
                var value = instance.getDataAtRowProp(i, prop)
                row.push(value)
            }

            csv += row.join(";")
            csv += "\n";
        }

        return csv;
    },

    download: function(instance, filename) {
        var csv = handsontable2csv.string(instance);

        var link = document.createElement("a");
        link.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(csv));
        link.setAttribute("download", filename);

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
};

TimeSheetApp = {
    init : function() {
        var that = this;

        this.newTsContainer = $("#new_ts_container");
        this.editTsContainer = $("#edit_ts_container");

        $("#new_month_ts").html(Core.monthMap[currMonth] + " " + currYear);

        this.$new_timesheet = $("#new_timesheet");
        this.$edit_timesheet = $("#edit_timesheet");
        this.monthOpt = document.getElementById("prev_month_ts");
        this.yearOpt = document.getElementById("prev_year_ts");
        this.checkMonth(this.newTsContainer, this.monthOpt);

        $("#save_ts_btn").click(function() {
            var dump = $(this).data('dump');
            that.$new_timesheet = $(dump);
            var newTS = JSON.stringify({"data": that.$new_timesheet.handsontable('getData')});
            that.saveTimeSheet(newTS);
        });

        $("#get_ts_btn").click(function() {
            $("#edit_box").show();
            that.getTimeSheet(that.$edit_timesheet);
        });

        $("#edit_ts_btn").click(function() {
            var dump = $(this).data('dump');
            that.$edit_timesheet = $(dump);
            var editedTS = JSON.stringify({"data": that.$edit_timesheet.handsontable('getData')});
            that.editTimesheet(editedTS);
        });

        $("#export_new").on('click', function () {
            var instance = that.$new_timesheet.handsontable('getInstance');
            handsontable2csv.download(instance, "timesheet" + currMonth + "." + currYear + ".csv");
        });

        $("#export_old").on('click', function () {
            var instance = that.$edit_timesheet.handsontable('getInstance');
            handsontable2csv.download(instance, "timesheet" + that.monthOpt.value + "." + that.yearOpt.value + ".csv");
        });
    },

    checkMonth : function(newTSCont, monthOpt) {
        var that = this;
        var monthList = {},
            yearList = {};

        ClientAPI.doRequest("timeSheet", "getSheet", {}, function(res) {
            if (res && res.error === 0) {
                if(res.rows.length !== 0) {
                    for (var i = 0 ; i < res.rows.length; i++) {
                        monthList[res.rows[i].ts_month] = Core.monthMap[res.rows[i].ts_month];
                        yearList[res.rows[i].ts_year] = res.rows[i].ts_year;

                        if ((currMonth in monthList) && (currYear in yearList)) {
                            // hide newTs container
                            newTSCont.hide();
                        } else {
                            that.loadNewSheet(that.$new_timesheet, currMonth, currYear);
                            newTSCont.show();
                        }
                        monthOpt.options[i] = new Option(Core.monthMap[res.rows[i].ts_month], res.rows[i].ts_month);
                    }
                } else {
                    that.loadNewSheet(that.$new_timesheet, currMonth, currYear);
                    newTSCont.show();
                }
            } else {
                Core.showMessage(res.msg);
            }
        });
    },

    saveTimeSheet : function($new_timesheet) {

        var data = {
            ts_month : currMonth,
            ts_year : currYear,
            timesheet : $new_timesheet
        };

        ClientAPI.doRequest("timeSheet", "saveSheet", data, function(res) {
            if (res && res.error === 0){
                console.log(res);
                window.location = location;
            } else {
                Core.showMessage("Неудачно.");
            }
        });
    },

    getTimeSheet : function($container) {
        var that = this;

        var nestedObjects = [];
        var data = {
            ts_month : that.monthOpt.value,
            ts_year : that.yearOpt.value
        };

        ClientAPI.doRequest("timeSheet", "getSheetByDate", data, function(res) {
            if (res && res.error === 0) {
                var date = new Date (that.yearOpt.value, that.monthOpt.value, 0);
                var days2 = date.getDate();
                var daysInMonth2 = [];
                for (var k = 0; k < days2; k++) {
                    daysInMonth2.push(k);
                }
                for (var i = 0; i < res.rows.length; i++) {
                    for (var j = 0; j < res.rows[i].timesheet.data.length; j++) {
                        nestedObjects.push(res.rows[i].timesheet.data[j])
                    }
                }
                that.buildTimeSheet($container, nestedObjects, daysInMonth2, data.ts_month, data.ts_year);
            }
        });
    },

    editTimesheet : function(newTS) {

        var that = this;

        var data = {
            ts_month : that.monthOpt.value,
            ts_year : that.yearOpt.value,
            timesheet : newTS
        };

        ClientAPI.doRequest("timeSheet", "updateTimeSheet", data, function(res) {
            if (res && res.error === 0) {
                window.location = location;
            } else {
                Core.showMessage("Неудачно.");
            }
        });
    },

    loadNewSheet : function($container, month, year) {

        var that = this;
        var nestedObjects = [];

        var daysInMonth = [];
        for (var i = 0; i < days; i++) {
            daysInMonth.push(i);
        }

        ClientAPI.doRequest("timeSheet", "getHead", {}, function(res) {
            if (res && res.error === 0) {
                console.log(res);
                for (var i = 0; i < res.rows.length; i++) {
                    nestedObjects.push({ts_nr: i + 1, ts_name: res.rows[i].last_name + " " + res.rows[i].first_name, ts_hire_date: null, ts_position: null, ts_month: Core.monthMap[month], ts_year: year, ts_day_1 : checkToday(1), ts_day_2 : checkToday(2), ts_day_3 : checkToday(3), ts_day_4 : checkToday(4), ts_day_5 : checkToday(5), ts_day_6 : checkToday(6), ts_day_7 : checkToday(7), ts_day_8 : checkToday(8), ts_day_9 : checkToday(9), ts_day_10 : checkToday(10), ts_day_11 : checkToday(11), ts_day_12 : checkToday(12), ts_day_13 : checkToday(13), ts_day_14 : checkToday(14), ts_day_15 : checkToday(15), ts_day_16 : checkToday(16), ts_day_17 : checkToday(17), ts_day_18 : checkToday(18), ts_day_19 : checkToday(19), ts_day_20 : checkToday(20), ts_day_21 : checkToday(21), ts_day_22 : checkToday(22), ts_day_23 : checkToday(23), ts_day_24 : checkToday(24), ts_day_25 : checkToday(25), ts_day_26 : checkToday(26), ts_day_27 : checkToday(27), ts_day_28 : checkToday(28), ts_day_29 : checkToday(29), ts_day_30 : checkToday(30), ts_day_31 : checkToday(31)})
                }
                that.buildTimeSheet($container, nestedObjects, daysInMonth, currMonth, currYear);
            }
        });
    },

    buildTimeSheet : function($container, data, daysArray, month, year) {
        var cellChanges = [];
        var that = this;
        var col = [];
        var colHead = [];

        col.push(
            {data: "ts_nr", readOnly: true},
            {data: "ts_name", readOnly: true},
//            {data: "ts_hire_date", readOnly: true},
//            {data: "ts_position", readOnly: true},
            {data: "ts_month", readOnly: true},
            {data: "ts_year", readOnly: true}
        );
        colHead.push("№", "ФИО(по алфавиту)", "Месяц", "Год");

        var greyRenderer = function (instance, td, row, col, prop, value, cellProperties) {
            Handsontable.renderers.TextRenderer.apply(this, arguments);
            $(td).css({
                background: 'grey'
            });
        };

        $.each(daysArray, function(i,val) {
            var cellData = {
                data: "ts_day_" + (i + 1),
                type: "dropdown",
                source : ["Я", "4ч", "О", "с/с", "Н", "Рв", "К", ""]
            };
            var weekDay = new Date(year, month-1, i);
            if (weekDay.getDay() === 6 || weekDay.getDay() === 5) {
                cellData.renderer = greyRenderer;
//                col.push(cellData);
            }
//            else {
//                col.push(cellData);
//            }
            col.push(cellData);
            colHead.push(i + 1);
        });

        $container.handsontable({
            data: data,
            rowHeaders: true,
            colHeaders: colHead,
            columns: col,
            fixedColumnsLeft : 4,
//            contextMenu : false,

            afterChange: function(changes, origin) {
                if (!changes) {
                    return;
                }
                $.each(changes, function(index, element) {
                    console.log(index, element);
                    var rowIndex = element[0],
                        columnIndex = element[4],
                        oldVal = element[2],
                        newVal = element[3];

                    var cellChange = {
                        'rowIndex': rowIndex,
                        'columnIndex': columnIndex
                    };

                    var td = $container.handsontable('getCell', rowIndex, columnIndex);

                    if (oldVal != newVal) {
                        cellChanges.push(cellChange);
                        td.classname = 'changeInput';
                    }
                });
            }
        });
    }
};
})();
