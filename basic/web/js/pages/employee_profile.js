/**
 * Created by Andrey_Egorov on 22.07.14.
 */

(function() {

window.onload = function() {
    LayoutApp && LayoutApp.init();
    CabinetPageApp && CabinetPageApp.init();
};

var userId = Core.getParameterByName('id');

CabinetPageApp = {
    init : function() {

        this.userName = document.getElementById("user_name");
        this.phoneEl = document.getElementById("cabinet_phone");
        this.emailEl = document.getElementById("cabinet_email");
        this.departmentEl = document.getElementById("cabinet_department");

//        this.getEmployeeInfo();
    },

    getEmployeeInfo : function() {

        var that = this;

        var data = {
            user_id : userId
        };

        ClientAPI.doRequest("employee", "getEmployeeInfo", data, function(res) {
            if (res && res.error === 0) {
                console.log(res);
                that.userName.innerHTML = res.rows[0].first_name + " " + res.rows[0].last_name;
                that.phoneEl.innerHTML += "+" + res.rows[0].phone;
                that.emailEl.innerHTML += res.rows[0].email;
                that.departmentEl.innerHTML += res.rows[0].department;
            } else if (res.rowCount = 0) {
                Core.showMessage("Такого пользователя не существует");
            } else {
                Core.showMessage(res.msg);
            }
        });
    }
}



})();