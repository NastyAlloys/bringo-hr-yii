/**
 * Created by Andrey_Egorov on 09.07.14.
 */


ClientAPI = {

//    doRequest : function(moduleName, methodName, data, callback) {
//
//        var requestBody = {
//            "header" : {
//                "module" : moduleName,
//                "method" : methodName
//            },
//            "data" : data
//        };
//
//        var request = new XMLHttpRequest();
//        request.open("POST", "/api");
//        request.setRequestHeader("Content-Type", "text/plain");
//        request.send(JSON.stringify(requestBody));
//        request.onreadystatechange = function() {
//            if (request.readyState === 4 && request.status === 200) {
//                callback(JSON.parse(request.responseText));
//            }
//        };
//    },

    doRequest : function(moduleName, methodName, data, callback) {

        var requestBody = {
            "header" : {
                "module"    : moduleName,
                "method"    : methodName
            },
            "data" : data
        };

        $.ajax({
            type: "POST",
            url : "/api",
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data: JSON.stringify(requestBody),
            success : function(res, textStatus, jqXHR) {
                if (res.header && res.header.error === 3) {
                    alert("Сессия завершена. Пожалуйста, зайдите снова.");
                } else {
                    callback(res, textStatus, jqXHR);
                }
            },
            error : function(jqXHR, textStatus, errorThrown) {
                console.log(jqXHR, textStatus, errorThrown);
            }
        });
    }
};