/**
 * Created by Andrey_Egorov on 22.08.14.
 */

(function() {

window.onload = function() {
    LayoutApp && LayoutApp.init();
    TaskManagerApp && TaskManagerApp.init();
};

var issueRow = [{
    name : "id",
    cls : "issue_id",
    changer : function(val) {
        return "<a href=\"http://77.91.80.27:9005/redmine/issues/" + val + "\">" + val + "</a>";
    }
}, {
    name : "author",
    cls : "issue_author",
    changer : function(obj) {
        return obj.name;
    }
}, {
    name : "assigned_to",
    cls : "issue_assigned_to",
    changer : function(obj) {
        if (obj == undefined) {
            return null;
        } else {
            return obj.name
        }
    }
}, {
    name : "created_on",
    cls : "issue_created_on",
    changer : function(val) {
        return val;
    }
}, {
    name : "status",
    cls : "issue_status",
    changer : function(obj) {
        return obj.name;
    }
}, {
    name : "subject",
    cls : "issue_subject",
    changer : function(val) {
        return val;
    }
}
//    , {
//    name : "description",
//    cls : "issue_description",
//    changer : function(val) {
//        return val;
//    }
//}
];

TaskManagerApp = {

    init : function() {
        var that = this;

        this.issueTable = document.getElementById("issue_list_table_body");
        that.optionList = document.getElementById("");

        this.getIssues();
//        this.getUsers();
    },

    getIssues : function() {
        var that = this;
        ClientAPI.doRequest("redmine", "getIssues", {}, function(res) {
            var redmineRes = JSON.parse(res);
            var issues = redmineRes.issues;
            console.log(issues);
            // var tbody = document.createElement("tbody");
            for (var i = 0; i < issues.length; i++) {
                var row = document.createElement("tr");
                for (var j = 0; j < 6; j++) {
                    var td = document.createElement("td");
                    var p = document.createElement("p");
                    p.innerHTML = "" + issueRow[j].changer(issues[i][issueRow[j].name]) + "";
                    p.setAttribute("class", issueRow[j].cls);
                    td.appendChild(p);
                    row.appendChild(td);
                    // tbody.appendChild(row);
                }
                that.issueTable.appendChild(row);
            }

        });
    },

    getUserInfo : function() {
        var that = this;
        ClientAPI.doRequest("redmine", "getUserInfo", {}, function(res) {
//            var redmineRes = JSON.parse(res);
//            var userInf = redmineRes.issues;
            console.log(res);
        });
    },

    getUsers : function() {
        var that = this;
        ClientAPI.doRequest("redmine", "getUsers", {}, function(res) {
//            console.log(res);
            var redmineRes = JSON.parse(res);
            var redmineUsers = redmineRes.users;
            console.log(redmineUsers);
//
//            for (var i = 0; i < redmineUsers.length; i++) {
//                issue_assigned_to_id
//            }
        });
    }
};
})();