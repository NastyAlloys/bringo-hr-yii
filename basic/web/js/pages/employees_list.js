/**
 * Created by Andrey_Egorov on 18.07.14.
 */

(function() {

window.onload = function() {
    LayoutApp && LayoutApp.init();
    UserPageApplication && UserPageApplication.init();
};

var employeesRow = [{
    name : "user_id",
    cls : "employee_list_id",
    changer : function(val) {
        return "<a href=\"/employee?id=" + parseInt(val) + "\">" + val + "</a>";
    }
}, {
    name : "first_name",
    cls : "employee_list_first_name",
    changer : function(val) {
        return val;
    }
}, {
    name : "last_name",
    cls : "employee_list_last_name",
    changer : function(val) {
        return val;
    }
}, {
    name : "email",
    cls : "employee_list_email",
    changer : function(val) {
        return val;
    }
}, {
    name : "phone",
    cls : "employee_list_phone",
    changer : function(val) {
        return "+" + val;
    }
}, {
    name : "department",
    cls : "employee_list_department",
    changer : function(val) {
        return val;
    }
}];

UserPageApplication = {
    init : function() {

        var that = this;

        this.employeesTable = document.getElementById("fragment_user_list_body");
        this.employeesHeaderTable = document.getElementById("fragment_user_list_table_header");

        this.getAllEmployees();
    },

    getAllEmployees : function() {

        var that = this;
        var data = null;

        ClientAPI.doRequest("employee", "getEmployees", data, function(res) {
            if (res && res.error === 0) {
                var employeesList = res.rows;
                // var tbody = document.createElement("tbody");
                for (var i = 0; i < employeesList.length; i++) {
                    var row = document.createElement("tr");
                    for (var j = 0; j < 6; j++) {
                        var td = document.createElement("td");
                        td.innerHTML = employeesRow[j].changer(employeesList[i][employeesRow[j].name]);
                        td.setAttribute("class", employeesRow[j].cls);
                        row.appendChild(td);
                        // tbody.appendChild(row);
                    }
                    that.employeesTable.appendChild(row);
                }
            } else {
                console.log(res);
            }
        });
    }
}

})();


