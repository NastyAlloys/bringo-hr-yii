/**
 * Created by Andrey_Egorov on 22.08.14.
 */

(function() {

window.onload = function() {
    ResetPassApp && ResetPassApp.init();
};

var token = Core.getParameterByName('token');

ResetPassApp = {

    init : function() {
        var that = this;

        this.newPswEl = $("#new_user_password");
        this.newPswConfirmEl = $("#new_user_password_confirm");
        this.userEmail = $("#user_email");

        $("#forgot_btn").click(function() {
            that.sendEmail();
        });

        $("#new_password_btn_confirm").click(function() {
            that.setNewPassword();
        });
    },

    sendEmail : function() {
        var that = this;

        var data = {
            email : that.userEmail.val()
        };
        console.log(data);

        ClientAPI.doRequest("authorization", "checkIfEmailExists", data, function(res) {
            if (res && res.error === 0) {
                console.log(res);
                Core.showMessage("Проверьте почту.");
                setTimeout(window.location = "/signin", 8000);
            } else {
                console.log(res);
                Core.showMessage(res.msg);
            }
        });
    },

    setNewPassword : function() {
        var that = this;
        var valid = true;
        var errorMessage = "";

        var data = {
            new_psw : that.newPswEl.val(),
            token : token
        };
        console.log(data);

        if (data.new_psw !== that.newPswConfirmEl.val()) {
            this.newPswEl.css('border-color', '#FF0000');
            this.newPswConfirmEl.css('border-color', '#FF0000');
            errorMessage += "Пароли не совпадают.<br>";
            valid = false;
        } else {
            this.newPswEl.css('border-color', '1px solid #d9d9d9;');
            this.newPswConfirmEl.css('border-color', '1px solid #d9d9d9;');
            valid = true;
        }

        if (data.new_psw.length < 6) {
            errorMessage += "Пароль должен быть больше пяти символов.<br>";
            valid = false;
        }

        if (!data.token) {
            errorMessage += "Сессия устарела, попробуйте снова.<br>";
            valid = false;
        }

        if (!valid) {
            Core.showMessage(errorMessage, 2);
        } else {
            ClientAPI.doRequest("authorization", "setNewPassword", data, function(res) {
                if (res && res.error === 0) {
                    console.log(res);
                    Core.showMessage("Пароль успешно изменен.");
                    setTimeout(window.location = "/signin", 3000);
                } else if (res && res.error === 8) {
                    Core.showMessage("сессия истекла. Попробуйте снова.");
                }
            });
        }
    }
};
})();