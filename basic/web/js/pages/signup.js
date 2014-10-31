/**
 * Created by Andrey_Egorov on 14.07.14.
 */

(function() {

window.onload = function() {
    RegisterApplication && RegisterApplication.init();
};

var kNamePattern = /^[a-zа-яA-ZА-Я]+$/;
var kEmailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//var kEmailPattern = /^[-a-zA-Z0-9_.]+@[-a-zA-Z0-9_.]{2,}\\.[a-zA-Z]{2,}$/;
var kPhonePattern = /^((8|7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{11}$/;

RegisterApplication = {
    init: function() {
        var that = this;

        this.firstNameEl = $("#user_first_name");
        this.secondNameEl = $("#user_last_name");
        this.pswEl = $("#user_password");
        this.pswRepEl = $("#user_repeat_password");
        this.phoneEl = $("#user_phone");
        this.phoneEl.mask("+7 (999) 999-99-99");
        this.emailEl = $("#user_email");
        this.departmentEl = $("#user_department");
        this.registerBtn = $("#register_btn");

        this.registerBtn.click(function() {
            that.doRegister();
        });
    },

    doRegister : function() {
        var that = this;
        var parsePhone = Core.parsePhone(that.phoneEl.val());
        var valid = true;
        var errorMessage = "";

        var data = {
            first_name : that.firstNameEl.val(),
            last_name : that.secondNameEl.val(),
            psw : that.pswEl.val(),
            email : (that.emailEl.val()).trim(),
            phone : parsePhone,
            department : that.departmentEl.val()
        };
        console.log(data);

        if (!data.first_name || !kNamePattern.test(data.first_name)) {
            errorMessage += "Имя должно содержать только буквы.<br>";
            valid = false;
        }

        if (!data.last_name || !kNamePattern.test(data.last_name)) {
            errorMessage += "Фамилия должна содержать только буквы.<br>";
            valid = false;
        }

        if (data.psw !== that.pswRepEl.val()) {
            this.pswEl.css('border-color', '#FF0000');
            this.pswRepEl.css('border-color', '#FF0000');
            errorMessage += "Пароли не совпадают.<br>";
            valid = false;
        } else {
            this.pswEl.css('border-color', '1px solid #d9d9d9;');
            this.pswRepEl.css('border-color', '1px solid #d9d9d9;');
            valid = true;
        }

        if (data.psw.length < 6) {
            errorMessage += "Пароль должен быть больше 8 символов.<br>";
            valid = false;
        }

        if (!data.email || !kEmailPattern.test(data.email)) {
            errorMessage += "Пожалуйста, правильно укажите Вашу электронную почту.<br>";
            valid = false;
        }

        if (!data.phone || !kPhonePattern.test(data.phone)) {
            errorMessage += "Пожалуйста, укажите Ваш номер телефона.<br>";
            valid = false;
        }

        if (!valid) {
            Core.showMessage("<h4><b>Не удалось выполнить регистрацию.</b></h4>" + errorMessage, 2);
        } else {
            ClientAPI.doRequest("authorization", "doRegister", data, function(res) {
                if (res && res.error === 0){
                    Core.showMessage("Спасибо за регистрацию.");
                    setTimeout(window.location = "/profile", 3000);
                } else if (res.error = 1) {
                    Core.showMessage(res.msg);
                }
            });
        }
    }
}

})();