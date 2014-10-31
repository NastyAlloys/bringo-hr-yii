/**
 * Created by Andrey_Egorov on 23.07.14.
 */

(function() {

window.onload = function(){
    LayoutApp && LayoutApp.init();
    PersonalCabinet && PersonalCabinet.init();
};

var now = new Date(),
    month = now.getMonth() + 1,
    year = now.getFullYear(),
    days = new Date(year, month, 0).getDate();

PersonalCabinet = {

    userId : null,

    init : function() {

        var that = this;

        this.monthOpt = document.getElementById('prev_month_ts');
        this.yearOpt = document.getElementById('prev_year_ts');

//        this.setExistingTSDates(this.monthOpt, this.yearOpt);

        this.changePhoneEl = $('.change_phone_fields_box');
        this.changePasswEl = $('.change_password_fields_box');

        $('#new_month_ts').html(Core.monthMap[month]);

        $('.change_phone_btn').click(function() {
            if (that.changePhoneEl.is(':visible')) {
                that.changePhoneEl.hide('fast');
            } else {
                that.changePhoneEl.show('fast');
            }
        });

        $('.change_password_btn').click(function() {
            if (that.changePasswEl.is(':visible')) {
                that.changePasswEl.hide('fast');
            } else {
                that.changePasswEl.show('fast');
            }
        });

        $('#new_ts_btn').click(function() {
            that.getNewTimeSheet();
        });

        $('#edit_ts_btn').click(function() {
            that.editPrevTimeSheet();
        });

        this.userName = document.getElementById("user_name");
        this.fNameEl = document.getElementById("cabinet_first_name");
        this.lNameEl = document.getElementById("cabinet_last_name");
        this.phoneEl = document.getElementById("cabinet_phone");
        this.emailEl = document.getElementById("cabinet_email");

        this.newPhoneEl = $("#new_user_phone");
        this.newPhoneEl.mask("+7 (999) 999-99-99");

        this.newPass = $("#new_user_password");
        this.oldPass = $("#old_user_password");

        $(".new_password_btn_confirm").click(function() {
            that.changeUserPassword();
        });

        $(".new_btn_confirm").click(function() {
            that.changeUserPhone();
        });
    },

    changeUserPhone : function() {

        var that = this;

        var parsedPhone = Core.parsePhone(that.newPhoneEl.val());

        if (parsedPhone !== "") {
            var data = {
                phone : Core.parsePhone(that.newPhoneEl.val())
            };

            ClientAPI.doRequest("authorization", "changeUserPhone", data, function(res) {
                if (res && res.error === 0) {
                    console.log(res);
                    Core.showMessage("Телефон изменен.");
                    that.changePhoneEl.hide('fast');
                } else {
                    Core.showMessage(res.msg);
                }
            });
        } else {
            Core.showMessage("Поле телефона не может быть пустым");
        }
    },

    changeUserPassword : function() {

        var that = this;

        if (that.newPass.val() !== "" && that.oldPass.val() !== "") {
            var data = {
                new_psw : that.newPass.val(),
                old_psw : that.oldPass.val()
            };

            if (data.new_psw.length < 6) {
                Core.showMessage("Пароль должен быть больше пяти символов.<br>");
            } else {
                ClientAPI.doRequest("authorization", "changeUserPassword", data, function(res) {
                    if (res && res.error === 0) {
                        Core.showMessage("Пароль изменен.");
                        that.changePasswEl.hide('fast');
                    } else if (res.error == 3) {
                        Core.showMessage("Пароль не найден.");
                    }
                });
            }
        } else {
            Core.showMessage("Поле пароля не может быть пустым");
        }
    },

    getNewTimeSheet : function() {
        window.location = "/timesheet";
    }
}
})();