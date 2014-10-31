/**
 * Created by Andrey_Egorov on 14.08.14.
 */

(function() {

window.onload = function() {
    LayoutApp && LayoutApp.init();
    MainPageApp && MainPageApp.init();
};

var SID = Core.getCookie().sid;

MainPageApp = {

    value : null,

    roles : [],

    init : function() {
        var that = this;

        this.value = null;

        this.getServices();

        this.infoBlock = $("#info_block");

        this.serviceHelper = document.getElementById("battle_helper");

        this.serviceName = $("#pop_up_name");
        this.serviceURL = $("#pop_up_url");
        this.serviceDesc = $("#pop_up_description");
        this.serviceSect = $("#pop_up_section");

        // не используется
        // var editName = $("#change_name_fields_box");
        // var editSection = $("#change_section_fields_box");
        // var editURL = $("#change_url_fields_box");
        // var editDescr = $("#change_descr_fields_box");

        // var infoFields = $(".service_info_fields");
        var changeFields = $(".change_fields");

        this.newName = $("#new_service_name");
        this.newSection = $("#edit_section");
        this.newURL = $("#new_service_url");
        this.newDescr = $("#new_service_descr");

        this.serviceNewName = $("#service_name");
        this.serviceNewSect = $("#service_section");
        this.serviceNewURL = $("#service_url");
        this.serviceNewDesc = $("#service_descr");

        $("#service_creator").click(function() {
            $(".pop_up").show();
        });

        $("#new_service_btn").click(function() {
            that.createNewService();
            that.serviceName.val("");
            that.serviceURL.val("");
            that.serviceDesc.val("");
            $("#battle_row").html("");
            $("#test_row").html("");
            $(".pop_up").hide();
        });

        $("#new_service_btn_cancel").click(function() {
            $(".pop_up").hide();
        });

        $(".ui-main_services").click(function(e) {
            var tgt = e.target;
            var parent = $(tgt).parent()[0];
            if(tgt.tagName == "SPAN" && parent.className == "col") {
                that.value = $(parent).data('value');
                $("#service_edit_box").show();
                that.getServiceById(that.value);
            }
        });

        // $("#edit_service_btn_change").click(function() {
        //     if (changeFields.is(':visible')) {
        //         changeFields.hide('fast');
        //     } else {
        //         changeFields.show('fast');
        //         infoFields.hide('fast');
        //         $("#edit_service_btn_confirm").show('fast');
        //         $("#edit_service_btn_change").hide('fast');
        //     }
        // });

        $("#edit_service_btn_confirm").click(function() {
            that.updateService(that.value);
            that.newName.val("");
            that.newURL.val("");
            that.newDescr.val("");
        });

        $("#edit_service_btn_delete").click(function() {
            that.deleteService(that.value);
        });

        $("#edit_service_btn_cancel").click(function() {
            that.newName.val("");
            that.newURL.val("");
            that.newDescr.val("");
            $("#service_edit_box").hide();
            // $("#edit_service_btn_change").show('fast');
            // $("#edit_service_btn_confirm").hide('fast');
            //changeFields.hide('fast');
            // infoFields.show('fast');
        });
    },

    showServiceCreatingOption : function(rolesList) {
        var that = this;
        var role = rolesList;
        var data = {
            SID : SID
        };

        ClientAPI.doRequest("employee", "getUserRole", data, function(res) {
            if (res && res.error === 0) {
                console.log(res);

                var roles = res.rows;
                for (var i = 0; i < roles.length; i++) {
                    role.push(roles[i].role_id);
                    if (roles[i].role_id == 1) {
                        that.infoBlock.show();
                    } else if (!roles[i].role_id == 1) {
                        $("#edit_service_btn_change").hide();
                        $("#edit_service_btn_delete").hide();
                    }
                }
            } else {
                console.log(res);
            }
        });
    },

    createNewService : function() {
        var that = this;
        var valid = true;
        var errorMessage = "";
        var data = {
            title : that.serviceName.val(),
            descr : that.serviceDesc.val(),
            url_string : that.serviceURL.val(),
            section : parseInt(that.serviceSect.val())
        };

        if (!data.title) {
            errorMessage += "Поле 'Название' не должно быть пустым.<br>";
            valid = false;
        }

        if (!data.descr) {
            errorMessage += "Поле 'Описание' не должно быть пустым.<br>";
            valid = false;
        }

        if (!data.url_string) {
            errorMessage += "Пожалуйста, правильно укажите адрес.<br>";
            valid = false;
        }

        if (!valid) {
            Core.showMessage("<h4><b>Не удалось добавить сервис.</b></h4>" + errorMessage, 2);
            that.getServices();
        } else {
            ClientAPI.doRequest("services", "addService", data, function(res) {
                if (res && res.error === 0) {
                    that.getServices();
                } else {
                    console.log(res);
                }
            });
        }
    },

    getServices : function() {
        var that = this;

        ClientAPI.doRequest("services", "getServices", {}, function(res) {
            if (res && res.error === 0) {
                var services = res.rows;
                if (services.length !== 0) {
                    for ( var i = 0; i < services.length; i++) {
                        var parentDiv = document.querySelector("[data-value=" + "'" + services[i].section + "'" + "]");
                        var newDiv =  document.createElement('div');
                        //var p = document.createElement('p');
                        newDiv.setAttribute('class', 'col');
                        newDiv.setAttribute('data-value', services[i].service_id);
                        //newDiv.innerHTML = "<a href=" + services[i].url_string + ">" + "<p>" + services[i].title + "</p>" + "</a>"; 
                        newDiv.innerHTML = "<a href=" + services[i].url_string + ">" + "<p>" + services[i].title + "</p>" + "<p class='descr'>" + services[i].descr + "</p>" + "</a>"; 
//                        newDiv.innerHTML += 
                        newDiv.innerHTML +="<span class='glyphicon glyphicon-pencil' title='Редактировать'></span>";
                        //p.innerHTML = services[i].descr;
                        //p.setAttribute('class', 'descr');
                        //newDiv.appendChild(p);
                        parentDiv.appendChild(newDiv);
                    }
                } else {
                    Core.showMessage("Сервисов не найдено.");
                }
            } else {
                console.log(res);
            }
        });
    },

    getServiceById : function(value) {
        var that = this;
        var data = {
            service_id : parseInt(value)
        };

        ClientAPI.doRequest("services", "getServiceById", data, function(res) {
            if (res && res.error === 0) {
                var serviceInf = res.rows[0];
                that.newName.val(serviceInf.title);
                that.newSection.val(serviceInf.section);
                that.newURL.val(serviceInf.url_string);
                that.newDescr.val(serviceInf.descr);
                $("#service_name").html(serviceInf.title);
                $("#service_section").html(serviceInf.section);
                $("#service_url").html(serviceInf.url_string);
                $("#service_descr").html(serviceInf.descr);
            } else {
                console.log(res);
            }
        });
    },

    updateService : function(value) {

        var that = this;
        var valid = true;
        var errorMessage = "";
        var data = {
            title : that.newName.val(),
            descr : that.newDescr.val(),
            url_string : that.newURL.val(),
            section : parseInt(that.newSection.val()),
            service_id : parseInt(value)
        };

        if (!data.title) {
            errorMessage += "Поле 'Название' не должно быть пустым.<br>";
            valid = false;
        }

        if (!data.descr) {
            errorMessage += "Поле 'Описание' не должно быть пустым.<br>";
            valid = false;
        }

        if (!data.url_string) {
            errorMessage += "Пожалуйста, правильно укажите адрес.<br>";
            valid = false;
        }

        if (!valid) {
            Core.showMessage("<h4><b>Не удалось добавить сервис.</b></h4>" + errorMessage, 2);
        } else {
            ClientAPI.doRequest("services", "updateService", data, function(res) {
                if (res && res.error === 0) {
                    window.location = location;
                } else {
                    console.log(res);
                }
            });
        }
    },

    deleteService : function(value) {

        var data = {
            service_id : parseInt(value)
        };

        ClientAPI.doRequest("services", "deleteService", data, function(res) {
            if (res && res.error === 0) {
                window.location = location;
            } else {
                console.log(res);
            }
        });
    }
};

})();