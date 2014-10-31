/**
 * Created by Andrey_Egorov on 21.07.14.
 */

(function() {

Core = {};

Core.showMessage = function(msg, timeout) {
    var msgBox = document.getElementById("message_box");
    if (!msgBox) {
        msgBox = document.createElement('div');
        msgBox.className = "message_box";
        msgBox.id = "message_box";
        document.body.appendChild(msgBox);
    }

    msgBox.innerHTML = msg;
    msgBox.style.display = "block";
    setTimeout(function() {
        Core.hideMessage();
    }, timeout ? timeout*1000 : 5000);
};

Core.hideMessage = function() {
    var mb = document.getElementById("message_box");
    if (mb) {
        mb.innerHTML = "";
        mb.style.display = "none";
    }
};

Core.setCookie = function(name, value, daysToLive) {
    var cookie = name + "=" + encodeURIComponent(value);
    if (typeof daysToLive === "number") {
        cookie += (daysToLive * 60 * 60 * 24);
    }
    document.cookie = cookie;
};

Core.getCookie = function() {
    var cookies = {}; //возвр объект
    var all = document.cookie; //все куки
    if (all === "") {
        return cookies; //если св-во пустое -> пустой объект возвр
    }
    var list = all.split("; ");
    //проход в цикле по парам
    for (var i = 0; i < list.length; i++) {
        var cookie = list[i];
        //разбиение пары
        var p = cookie.indexOf("=");
        var name = cookie.substr(0,p);
        var value = cookie.substr(p+1);
        cookies[name] = decodeURIComponent(value);
    }
    return cookies;
};

Core.eraseCookie = function(name) {
    this.setCookie(name, "", -1);
};

Core.getParameterByName = function(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
};

Core.parsePhone = function(phonestring) {
    return phonestring.replace(/[+ () -]/gi, "");
};

Core.blockEventPropagation = function(event) {
    event.stopPropagation();
    event.preventDefault();
};

Core.unixTimeToHHMM = function(unixTime) {
    if (unixTime) {
        var d = new Date(unixTime);
        var year = d.getFullYear();
        var month = d.getMonth() + 1;
        var day = d.getDate();
        var hours = d.getHours() - 4;
        var minutes = d.getMinutes();
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
        return "" + year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + "00";
    }
    return "";
};

Core.monthMap = {
    1 : "Январь",
    2 : "Февраль",
    3 : "Март",
    4 : "Апрель",
    5 : "Май",
    6 : "Июнь",
    7 : "Июль",
    8 : "Август",
    9 : "Сентябрь",
    10 : "Октябрь",
    11 : "Ноябрь",
    12 : "Декабрь"
};

})();