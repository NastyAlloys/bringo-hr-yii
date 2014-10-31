/**
 * Created by Andrey_Egorov on 09.07.14.
 */

(function() {

window.onload = function() {
    Login && Login.init();
};

Login = {
    init : function() {
        var that = this;

        this.emailElVal = document.getElementById("user_email");
        this.passwordElVal = document.getElementById("user_password");
        this.loginBtn = document.getElementById("login_btn");

        this.loginBtn.onclick = function() {
            that.doLogin();
        }
    },

    doLogin : function() {

        var that = this;

        var data = {
            email : that.emailElVal.value,
            psw : that.passwordElVal.value
        };

        ClientAPI.doRequest("authorization", "doLogin", data, function(res) {
            if (res && res.error === 0){
                console.log(res);
                window.location = "/profile";
            } else {
                Core.showMessage("<h4><b>Проверьте почту и пароль еще разок.</b></h4>");
            }
        });
    }
}

})();
