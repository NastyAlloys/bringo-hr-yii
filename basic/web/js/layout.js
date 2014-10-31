/**
 * Created by Andrey_Egorov on 28.08.14.
 */

(function() {

//window.onload = function() {
//    LayoutApp && LayoutApp.init();
//};

var SID = Core.getCookie().sid;

LayoutApp = {
    init : function() {
        this.leftLayout = document.getElementById("ui-layout_left");

        this.getInviteNotifications();
    },

    getInviteNotifications : function() {
        var that = this;

        var data = {
            SID : SID
        };

        ClientAPI.doRequest("calendar", "getInviteNotifications", {}, function(res) {
            if (res && res.error === 0) {
                var notifications = res.rows;
                if (notifications.length !== 0) {
                    for (var i = 0; i < notifications.length; i++) {
                        if (!notifications[i].invite_action_status) {
                            var div = document.createElement('div');
                            div.setAttribute("class", "ui-layout_left_block");
                            var p = document.createElement('p');
                            p.setAttribute("class", "notification_info");
                            var confirmBtn = document.createElement('button');
                            var cancelBtn = document.createElement('button');
                            var id = notifications[i].event_id;
                            confirmBtn.id = id;
                            cancelBtn.id = id;
                            confirmBtn.setAttribute("class", "button button_row confirm");
                            cancelBtn.setAttribute("class", "button cancel");
                            confirmBtn.innerHTML = "Принять";
                            cancelBtn.innerHTML = "Отклонить";
                            if (confirmBtn.addEventListener) {
                                confirmBtn.addEventListener('click', function(confirmBtnId) {
                                    return function () {
                                        that.acceptInvite(confirmBtnId);
                                    }
                                }(confirmBtn.id), true);
                            }
                            if (cancelBtn.addEventListener) {
                                cancelBtn.addEventListener('click', function(confirmBtnId) {
                                    return function () {
                                        that.declineInvite(confirmBtnId);
                                    }
                                }(cancelBtn.id), true);
                            }
                            p.innerHTML ="<b style='font-weight: bold;'>" +  notifications[i].first_name + " " + notifications[i].last_name + "</b>" + " пригласил Вас на встречу " + "'" +  notifications[i].title + "'" + " , которая пройдет с " + "<b style='font-weight: bold;'>" + Core.unixTimeToHHMM(new Date(notifications[i].start_time).getTime()) + "</b>" + " по "+ "<b style='font-weight: bold;'>" +  Core.unixTimeToHHMM(new Date(notifications[i].end_time).getTime()) + "</b>";
                            div.appendChild(p);
                            div.appendChild(confirmBtn);
                            div.appendChild(cancelBtn);
                        }
                    }
                    that.leftLayout.appendChild(div);
                }
            } else {
                Core.showMessage(res.msg);
            }
        });
    },

    acceptInvite : function(event_id) {
        var that = this;
        var data = {
            invite_action_status : true,
            invite_status : true,
            SID : SID,
            event_id : event_id
        };

        ClientAPI.doRequest("calendar", "updateInviteStatus", data, function(res) {
            if (res && res.error === 0) {
                Core.showMessage("Вы согласились на встречу.");
                window.location = location;
            } else {
                Core.showMessage(res.msg);
            }
        });
    },

    declineInvite : function(event_id) {
        var that = this;
        var data = {
            invite_action_status : true,
            invite_status : false,
            SID : SID,
            event_id : event_id
        };

        ClientAPI.doRequest("calendar", "updateInviteStatus", data, function(res) {
            if (res && res.error === 0) {
                Core.showMessage("Вы отказались от встречи.");
                that.deleteDeclinedInvite(data);
                window.location = location;
            } else {
                Core.showMessage(res.msg);
            }
        });
    },

    deleteDeclinedInvite : function(data) {
        ClientAPI.doRequest("calendar", "deleteDeclinedInvite", data, function(res) {
            if (res && res.error === 0) {
                console.log(res);
            } else {
                Core.showMessage(res.msg);
            }
        });
    }
};

})();