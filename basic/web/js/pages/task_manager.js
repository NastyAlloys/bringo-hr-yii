/**
 * Created by Andrey_Egorov on 28.08.14.
 */

(function() {

window.onload = function() {
    LayoutApp && LayoutApp.init();
    TaskManagerApp && TaskManagerApp.init();
};

var taskPriority = {
    1 : "Низкий",
    2 : "Нормальный",
    3 : "Высокий"
};

var myTasksRow = [{
    name : "task_id",
    cls : "task_id",
    changer : function(val) {
        return val;
//        "<a href=\"http://77.91.80.27:9005/redmine/issues/" + val + "\">" + val + "</a>";
    }
}, {
    name : "creator",
    cls : "task_creator_name",
    changer : function(val) {
        return val;
    }
}, {
    name : "subject",
    cls : "task_subject",
    changer : function(val) {
        return val;
    }
}, {
    name : "description",
    cls : "task_description",
    changer : function(val) {
        return val;
    }
}, {
    name : "status",
    cls : "task_status",
    changer : function(val) {
        return val;
    }
}, {
    name : "priority",
    cls : "task_priority",
    changer : function(val) {
        return val;
    }
}];

var createdTasksRow = [{
    name : "task_id",
    cls : "task_id",
    changer : function(val) {
        return val;
//        "<a href=\"http://77.91.80.27:9005/redmine/issues/" + val + "\">" + val + "</a>";
    }
}, {
    name : "assigned_to",
    cls : "task_assigned_to",
    changer : function(val) {
        return val;
    }
}, {
    name : "subject",
    cls : "task_subject",
    changer : function(val) {
        return val;
    }
}, {
    name : "description",
    cls : "task_description",
    changer : function(val) {
        return val;
    }
}, {
    name : "status",
    cls : "task_status",
    changer : function(val) {
        return val;
    }
}, {
    name : "priority",
    cls : "task_priority",
    changer : function(val) {
        return val;
    }
}, {
    name : "assigned_to_id",
    cls : "task_assigned_to_id",
    changer : function(val) {
        return val;
    }
}];

var SID = Core.getCookie().sid;

TaskManagerApp = {
    init : function() {
        var that = this;

        var changeFields = $(".change_fields");

        this.selectUser = document.getElementById('task_assigned_to');
        this.showSelectUser = document.getElementById('new_task_assigned_to');

        this.newTaskAssignedTo = document.getElementById('new_task_assigned_to');

        this.issueSubject = document.getElementById('task_subject');
        this.issueDescription = document.getElementById('task_description');
        this.issuePriority = document.getElementById('task_priority');
        this.issueStatus = document.getElementById('task_status');

        this.myTasksAmount = $('#mytasks');
        this.createdTasksAmount = $('#createdtasks');

        this.personalTasks = document.getElementById('list_of_user_tasks');
        this.createdTasks = document.getElementById('list_of_created_tasks');
        this.showTaskId = $('#show_task_id');

        this.taskId = null;

        this.form = {
            task_id : this.showTaskId,
            creator : $('#show_task_creator'),
            assigned_to : $('#show_task_assigned_to'),
            status : $('#show_task_status'),
            description : $('#show_task_descr'),
            subject : $('#show_task_subject'),
            priority : $('#show_task_priority')
        };

        this.newTaskDescr = $('#new_task_descr');
        this.newTaskStatus = $('#new_task_status');
        this.newTaskPriority = $('#new_task_priority');
        this.newTaskSubject = $('#new_task_subject');

        this.splitContent = $("#splitcontent");

        this.getUserList(this.selectUser);
        this.getIssuesAsCreator();

        $("#task_creator").click(function() {
            $("#new_task").show();
        });

        $("#new_task_btn").click(function() {
            that.createIssue();
        });

        $("#new_task_btn_cancel").click(function() {
            $("#new_task").hide();
        });

        $("#edit_task_btn_change").click(function() {
            if (changeFields.is(':visible')) {
                changeFields.hide('fast');
            } else {
                changeFields.show('fast');
                $("#edit_task_btn_confirm").show('fast');
                $("#edit_task_btn_change").hide('fast');
            }
        });

        $("#edit_task_btn_confirm").click(function() {
            that.updateIssue();
        });

        $("#edit_task_btn_delete").click(function() {
            that.deleteTask();
        });

        $("#edit_task_btn_cancel").click(function() {

            $("#edit_task").hide();
            $("#edit_task_btn_change").show('fast');
            $("#edit_task_btn_confirm").hide('fast');
            changeFields.hide('fast');
        });

        $('th').click(function() {
            var table = $(this).parents('table').eq(0);
            var rows = table.find('tr:gt(0)').toArray().sort(that.toCompareValues($(this).index()));
            this.asc = !this.asc;
            if (!this.asc) {
                rows = rows.reverse()
            }
            for (var i = 0; i < rows.length; i++) {
                table.append(rows[i]);
            }
        });
    },

    getUserList : function(selectList) {
        var that = this;

        ClientAPI.doRequest("employee", "getEmployees", {}, function(res) {
            if (res && res.error === 0) {
                for (var i = 0 ; i < res.rows.length; i++) {
                    selectList.options[i] = new Option(res.rows[i].last_name + " " + res.rows[i].first_name, res.rows[i].user_id);
                }
            } else {
                Core.showMessage(res.msg);
            }
        });
    },

    createIssue : function() {
        var that = this;

        var data = {
            assigned_to : that.selectUser.options[that.selectUser.selectedIndex].text,
            assigned_to_id : that.selectUser.value,
            stat : that.issueStatus.value,
            priority : that.issuePriority.value,
            descript : that.issueDescription.value,
            subject : that.issueSubject.value
        };

        ClientAPI.doRequest("taskManager", "createIssue", data, function(res) {
            if (res && res.error === 0) {
                window.location = location;
            } else {
                Core.showMessage(res.msg);
            }
        });
    },

    getIssuesAsCreator : function() {
        var that = this;

        ClientAPI.doRequest("taskManager", "getIssuesAsCreator", {}, function(res) {
            if (res && res.error === 0) {
                var createdTasks = res.rows;
                that.createdTasksAmount.html(createdTasks.length);
                var tbody = document.createElement("tbody");
                for (var i = 0; i < createdTasks.length; i++) {
                    var row = document.createElement("tr");
                    row.setAttribute("class", "sort_val");
                    for (var j = 0; j < 6; j++) {
                        var td = document.createElement("td");
                        td.innerHTML = createdTasksRow[j].changer(createdTasks[i][createdTasksRow[j].name]);
                        td.setAttribute("class", createdTasksRow[j].cls);
                        row.appendChild(td);
                        tbody.appendChild(row);
                    }
                    that.createdTasks.appendChild(tbody);
                }
                that.getIssuesAsPerformer();
            }
        });
    },

    getIssuesAsPerformer : function() {
        var that = this;

        ClientAPI.doRequest("taskManager", "getIssuesAsPerformer", {}, function(res) {
            if (res && res.error === 0) {
                var myTasks = res.rows;
                that.myTasksAmount.html(myTasks.length);
                var tbody = document.createElement("tbody");
                for (var i = 0; i < myTasks.length; i++) {
                    if (myTasks[i].status !== "")
                    var row = document.createElement("tr");
                    row.setAttribute("class", "sort_val");
                    for (var j = 0; j < 6; j++) {
                        var td = document.createElement("td");
                        td.innerHTML = myTasksRow[j].changer(myTasks[i][myTasksRow[j].name]);
                        td.setAttribute("class", myTasksRow[j].cls);
                        row.appendChild(td);
                        tbody.appendChild(row);
                    }
                    that.personalTasks.appendChild(tbody);
                }
                that.setCellActive();
            }
        });
    },

    toCompareValues : function(index) {
        var that = this;
        return function(a, b) {
            var valA = that.getCellValue(a, index), valB = that.getCellValue(b, index);
            return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.localeCompare(valB)
        }
    },

    getCellValue : function(row, index) {
        return $(row).children('td').eq(index).html();
    },

    setCellActive : function() {
        var that = this;
        that.splitContent.on('click', 'tr', function () {
            if ($(this).hasClass('sort_val')) {
                $(this).siblings('tr').removeClass('active').end().addClass('active');
                that.taskId = parseInt($(this).find('.task_id').text());
                that.getUserList(that.showSelectUser);
                that.getIssueInfo(that.taskId);
                $("#edit_task").show();
            }
        });
    },

    getIssueInfo : function(taskId) {
        var that = this;

        var data = {
            task_id : taskId
        };

        ClientAPI.doRequest("taskManager", "getIssueInfo", data, function(res) {
            if (res && res.error === 0) {
                var taskInfo = res.rows[0];

                for (var i in that.form) {
                    if (taskInfo.hasOwnProperty(i)) {
                        that.form[i].html(taskInfo[i]);
                    } else {
                        console.log(taskInfo[i]);
                    }
                }

                that.newTaskDescr.val(taskInfo.description);
                that.newTaskSubject.val(taskInfo.subject);
            }
        });
    },

    updateIssue : function() {
        var that = this;

        var data = {
            task_id : that.showTaskId.html(),
            descr : that.newTaskDescr.val(),
            status : that.newTaskStatus.val(),
            priority : that.newTaskPriority.val(),
            assigned_to : that.newTaskAssignedTo.options[that.showSelectUser.selectedIndex].text,
            assigned_to_id : that.newTaskAssignedTo.value,
            subject : that.newTaskSubject.val()
        };

        ClientAPI.doRequest("taskManager", "updateIssue", data, function(res) {
            if (res && res.error === 0) {
                window.location = location;
            } else {
                console.log(res)
            }
        });
    },

    deleteTask : function() {

        var that = this;

        var data = {
            task_id : that.showTaskId.html()
        };

        ClientAPI.doRequest("taskManager", "deleteIssue", data, function(res) {
            if (res && res.error === 0) {
                window.location = location;
            }
        });
    }
};
})();