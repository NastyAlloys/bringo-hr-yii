/*
 * Created by Andrey_Egorov on 23.07.14.
 */

(function() {

window.onload = function() {
    LayoutApp && LayoutApp.init();
    EventCalendar && EventCalendar.init();
};

function utcTimeToDMY(utcTime) {
    if (utcTime) {
        var d = new Date(utcTime);
        var year = d.getUTCFullYear();
        var month = d.getUTCMonth() + 1;
        var day = d.getUTCDate();
        var hours = d.getUTCHours();
        var minutes = d.getUTCMinutes();
        if (String(month).length < 2) {
            month = "0" + month;
        }
        if (String(day).length < 2) {
            day = "0" + day;
        }
        if (String(hours).length < 2) {
            hours = "0" + hours;
        }
        if (String(minutes).length < 2) {
            minutes = "0" + minutes;
        }
        return "" + day + "." + month + "." + year;
    }
    return "";
};

function utcTimeToHM(utcTime) {
    if (utcTime) {
        var d = new Date(utcTime);
        var hours = d.getUTCHours();
        var minutes = d.getUTCMinutes();
        if (String(hours).length < 2) {
            hours = "0" + hours;
        }
        if (String(minutes).length < 2) {
            minutes = "0" + minutes;
        }
        return "" + hours + ":" + minutes;
    }
    return "";
};

function stringToNmb(strArray) {
    var num = [];
    if (strArray !== null) {
        for (var i = 0; i < strArray.length; i++) {
            num.push(parseInt(strArray[i]));
        }
    }
    return num;
};

var kEmailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

EventCalendar = {

    events : [],

    participants : [],

    /*
     * @func : init
     */
    init : function() {

        var that = this;

        this.eventDate = $("#event_date");
        this.eventDate.mask("00.00.00");
        this.eventST = $("#event_start_time");
        this.eventST.mask("00:00");
        this.eventET = $("#event_end_time");
        this.eventET.mask("00:00");

        this.selectGuests = $(".select_guests");
        this.getUserList(this.selectGuests);
        this.selectGuests.chosen({width: "210px",
            placeholder_text_multiple: "Выберите участника",
            no_results_text: "Участник не найден"});

        this.eventDate.datepicker({
            format: "dd.mm.yyyy",
            todayBtn: "linked",
            language: "ru",
            forceParse: false
        });

        this.eventName = $("#event_name");
        this.eventDescription = $("#event_description");

        this.eventGuests = $("#event_guests");

        //prevent page reload by hitting enter on a form
        $('input,select').keypress(function(event) { if (event.keyCode == 13) { event.preventDefault(); } });

        this.eventGuests.autocomplete({
            source: function (request, response) { that.findUsersByEmail(request, response); },

            // The minimum number of characters a user must type before a search is performed.
            minLength: 1,

            // set an onFocus event to show the result on input field when result is focused
            focus: function (event, ui) {
                this.value = ui.item.label;
                // Prevent other event from not being execute
                event.preventDefault();
            },
            select: function (event, ui) {
                // Prevent value from being put in the input:
                this.value = ui.item.label;
                // Set the id to the next input hidden field
                $(this).next("input").val(ui.item.value);
                // Prevent other event from not being execute
                event.preventDefault();
            }
        });

        var calendar = $('#calendar');
//        var eventDialog = $("#event_dialog");
        var eventDialog = $("#event");

        var event_id = $("#event_id");

//        eventDialog.dialog({ autoOpen: false });

        calendar.fullCalendar({
            lang: 'ru',

            /*
             header option will define our calendar header.
             left define what will be at left position in calendar
             center define what will be at center position in calendar
             right define what will be at right position in calendar
             */
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay'
            },
            /*
             defaultView option used to define which view to show by default,
             for example we have used agendaWeek.
             */
            defaultView: 'agendaWeek',
            /*
             selectable:true will enable user to select datetime slot
             selectHelper will add helpers for selectable.
             */
            selectable: true,
            selectHelper: true,
            /*
             when user select time-slot this option code will execute.
             It has three arguments. Start,end and allDay.
             Start means starting time of event.
             End means ending time of event.
             allDay means if events is for entire day or not.
             */
            select: function(start, end, allDay) {
                eventDialog.show();
                $("#new_event_btn").show();
                $("#edit_event_btn").hide();
                $("#delete_event_btn").hide();

                that.eventDate.datepicker('update', new Date(start._d));
                that.eventST.val(utcTimeToHM(start._d));
                that.eventET.val(utcTimeToHM(end._d));

                $("#new_event_btn").click(function() {
                    var date = that.eventDate.datepicker('getUTCDate');
                    var newSTime = that.eventST.val().split(":");
                    var newETime = that.eventET.val().split(":");
                    that.saveEvent(date, newSTime, newETime, calendar);
                });
                $("#new_event_btn_cancel").click(function() {
                    eventDialog.hide();
                    $("#new_event_btn").unbind();
                });
            },

            events: function(start, end, timezone, callback) {

                var startTime = Core.unixTimeToHHMM(start._d.getTime());
                var endTime = Core.unixTimeToHHMM(end._d.getTime());

                var data =  {
                    start_time: startTime,
                    end_time: endTime
                };

                that.getEvent(data, calendar, callback);
//                that.getEventAsParticipant(data, calendar, callback);
            },

            eventClick: function(calEvent, jsEvent, view) {

                eventDialog.show();

                $("#new_event_btn").hide();
                $("#edit_event_btn").show();
                $("#delete_event_btn").show();

                that.eventDate.datepicker('update', new Date(calEvent.start._d));
                that.eventST.val(utcTimeToHM(calEvent.start._d));
                that.eventET.val(utcTimeToHM(calEvent.end._d));
                that.eventName.val(calEvent.title);
                that.eventDescription.val(calEvent.desc);

                that.getParticipants(calEvent.id);

                $("#edit_event_btn").click(function() {
                    var date = that.eventDate.datepicker('getUTCDate');
                    var newSTime = that.eventST.val().split(":");
                    var newETime = that.eventET.val().split(":");
                    that.updateEvent(date, newSTime, newETime, calEvent);
                });

                $("#delete_event_btn").click(function() {
                    var data = { event_id : calEvent.id };
                    that.deleteEvent(calendar, data);
                });
                $("#new_event_btn_cancel").click(function() {
                    eventDialog.hide();
                    $("#edit_event_btn").unbind();
                });
            },

            /*
             editable: true allow user to edit events.
             */
            editable: false
        });
    },

    getUserList : function(selectList) {
        var that = this;

        ClientAPI.doRequest("employee", "getEmployees", {}, function(res) {
            if (res && res.error === 0) {
                for (var i = 0 ; i < res.rows.length; i++) {
                    selectList.append('<option value=' + res.rows[i].user_id + '>' + res.rows[i].email + '</option>');
                    selectList.trigger("chosen:updated");
                }
            } else {
                Core.showMessage(res.msg);
            }
        });
    },

    /*
     * @func : saveEvent
     * @param : data:
     * @param : calendar:
     * @param: time:
     */
    saveEvent : function(date, newSTime, newETime, calendar) {

        var that = this;

        var startDate = date.setUTCHours(parseInt(newSTime[0]), parseInt(newSTime[1]));
        var endDate = date.setUTCHours(parseInt(newETime[0]), parseInt(newETime[1]));

        var data = {
            start_time : Core.unixTimeToHHMM(startDate),
            end_time : Core.unixTimeToHHMM(endDate),
            title : that.eventName.val(),
            desc : that.eventDescription.val(),
            all_day: false,
            guests : stringToNmb(that.selectGuests.val())
        };

        ClientAPI.doRequest("calendar", "addEvent", data, function(res) {
            if (res && res.error === 0) {
//                data.event_id = res.rows[0].event_id;
//                console.log(data);
                that.addParticipants(data);
                location.reload();
//                calendar.fullCalendar('renderEvent', {
//                        event_id: res.rows[0].event_id,
////                        creator_id : res.rows[0].creator_id,
//                        title: data.title,
//                        start: data.start_time,
//                        end: data.end_time,
//                        allDay: data.allDay
//                    },
//                    true // make the event "stick"
//                );
//                calendar.fullCalendar('unselect');
            } else {
                console.log(res);
            }
        });
    },

    /*
     * @func : getEvent
     * @param : data:
     * @param : calendar:
     * @param : callback:
     */
    getEvent : function(data, calendar, callback) {
        var that = this;
        ClientAPI.doRequest("calendar", "getEvent", data, function(res) {
            if (res && res.error === 0) {
                var events = [];
                for (var i = 0; i < res.rows.length; i++) {

                    var start = new Date(res.rows[i].start_time);
                    var end = new Date(res.rows[i].end_time);

                    events.push({
                        id : res.rows[i].event_id,
                        title : res.rows[i].title,
                        desc :  res.rows[i].definition,
                        start : start.getTime(),
                        end : end.getTime(),
                        allDay : res.rows[i].all_day
                    })
                }
                that.getEventAsParticipant(data, calendar, callback, events);
            } else {
                console.log(res);
            }
        });
    },

    /*
     * @func : getEventAsParticipant
     * @param : data
     * @param : calendar
     * @param : callback
     */
    getEventAsParticipant : function(data, calendar, callback, events) {
        ClientAPI.doRequest("calendar", "getEventAsParticipant", data, function(res) {
            if (res && res.error === 0) {
                var eventsPart = [];
                for (var i = 0; i < res.rows.length; i++) {
                    var start = new Date(res.rows[i].start_time);
                    var end = new Date(res.rows[i].end_time);

                    events.push({
                        id : res.rows[i].event_id,
                        title : res.rows[i].title,
                        desc :  res.rows[i].definition,
                        start : start.getTime(),
                        end : end.getTime(),
                        allDay : res.rows[i].all_day,
                        color : 'green'
                    })
                }
                callback(events);
            } else {
                console.log(res);
            }
        });
    },


    /*
     * @func : updateEvent
     * @param : data:
     */
    updateEvent : function(date, newSTime, newETime, calEvent, emails) {
        var that = this;

        var startDate = date.setUTCHours(parseInt(newSTime[0]), parseInt(newSTime[1]));
        var endDate = date.setUTCHours(parseInt(newETime[0]), parseInt(newETime[1]));

        var data = {
            start_time : Core.unixTimeToHHMM(startDate),
            end_time : Core.unixTimeToHHMM(endDate),
            event_id : calEvent.id,
            title : that.eventName.val(),
            desc : that.eventDescription.val(),
            all_day: false,
            guests : stringToNmb(that.selectGuests.val())
        };

        ClientAPI.doRequest("calendar", "updateEvent", data, function(res) {
            if (res && res.error === 0) {
                location.reload();
            } else {
                console.log(res);
            }
        });
    },

    /*
     * @func : deleteEvent
     * @param : data:
     * @param : calendar:
     */
    deleteEvent : function(calendar, data) {

        ClientAPI.doRequest("calendar", "deleteEvent", data, function(res) {
            if (res && res.error === 0) {
                location.reload();
                calendar.fullCalendar('removeEvents', data.event_id);
            } else {
                console.log(res);
            }
        });
    },

    /*
     * @func : addParticipant
     * @param : data:
     */
    addParticipants : function(data) {
        var that = this;
//        for (var i = 0; i < data.guests.length; i++) {
        if (data.guests.length !== 0) {
            ClientAPI.doRequest("calendar", "addParticipants", data, function(res) {
                if (res && res.error === 0) {
                } else {
                    console.log(res);
                }
            });
        }
//        }
    },

    /*
     * @func : addParticipant
     * @param : data:
     */
    deleteParticipant : function(data) {
        var that = this;

        ClientAPI.doRequest("calendar", "deleteParticipant", data, function(res) {
            if (res && res.error === 0) {
            } else {
                console.log(res);
            }
        });
    },

    /*
     * @func : getParticipants
     * @param : event_id:
     */
    getParticipants : function(event_id) {

        var that = this;

        var data = {
            event_id : event_id
        };

        ClientAPI.doRequest("calendar", "getParticipants", data, function(res) {
            if (res && res.error === 0) {
                var result = res.rows;
                var guests = [];

                if (result.length !== 0) {
                    for (var i = 0; i < result.length; i++) {
                        guests.push(result[i].userid.toString());
                    }
                }
                that.selectGuests.val(guests);
                that.selectGuests.trigger("chosen:updated");
            } else {
                console.log(res);
            }
        });
    },

    /*
     * @func : deleteParticipants
     * @param : event_id:
     */
    deleteParticipants : function(event_id) {
        var data = {
            event_id : event_id
        };

        ClientAPI.doRequest("calendar", "deleteParticipants", data, function(res) {
            if (res && res.error === 0) {
            } else {
                console.log(res);
            }
        });
    },

    /*
     * @func : findUsersByEmail
     * @param : request:
     * @param : response:
     */
    findUsersByEmail : function(request, response) {

        var data = {
            email : request.term
        };

        ClientAPI.doRequest("calendar", "findUsersByEmail", data, function(res) {
            if (res && res.error === 0) {
                response($.map(res.rows, function (el) {
                    return {
                        value: el.email
                    };
                }));
            } else {
                console.log(res);
            }
        });
    },

    /* режимы открытия формы */
    formOpen : function(mode) {
        if(mode == 'add') {
            /* скрываем кнопки Удалить, Изменить и отображаем Добавить*/
            $('#add').show();
            $('#edit').hide();
            $("#delete").button("option", "disabled", true);
        }
        else if(mode == 'edit') {
            /* скрываем кнопку Добавить, отображаем Изменить и Удалить*/
            $('#edit').show();
            $('#add').hide();
            $("#delete").button("option", "disabled", false);
        }
        form.dialog('open');
    }
};

})();