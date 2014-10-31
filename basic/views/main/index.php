<?php
/* @var $this yii\web\View */
?>
<div class="content ui-main">
        <h1>Наши сервисы</h1>
        <!-- {% for role in userroles %} -->
        <!-- {% if role == 1 %} -->
        <p id="info_block" class="info-block info-block-small">Для добавления сервиса нажмите <span id="service_creator" class="button_add">+</span></p>
        <!-- {% endif %} -->
        <!-- {% endfor %} -->
        <div class="ui-main_services row">
            <h2>Боевые</h2>
            <div class="row" id="battle_row" data-value="1"></div>
            <h2>Тест</h2>
            <div class="row" id="test_row" data-value="2"></div>
        </div>
    </div>

<!-- {% for role in userroles %} -->
<!-- {% if role == 1 %} -->
    <div class="message_box form pop_up ui-main_services_add_form">
        <label class="row">Название:</label>
        <input class="row" id="pop_up_name" type="text" autocomplete="off">

        <label class="row">Раздел:</label>
        <select class="row" id="pop_up_section">
            <option value="1">Боевые</option>
            <option value="2">Тест</option>
        </select>

        <label class="row">Адрес:</label>
        <input class="row" id="pop_up_url" type="text" autocomplete="off">

        <label class="row">Описание:</label>
        <input class="row" type="text" id="pop_up_description" autocomplete="off">

        <button class="button button_block" id="new_service_btn">Добавить</button>
        <button class="button button_block" id="new_service_btn_cancel">Отмена</button>
    </div>

    <div class="message_box" id="service_edit_box" style="display: none;">
        <!-- <div class="service_info_fields">
            <label class="service_label">Название:</label>
            <span class="service_value">
                <span id="service_name"></span>
            </span>
            <label class="service_label">Раздел:</label>
            <span class="service_value">
                <span id="service_section"></span>
            </span>
            <label class="service_label">Адрес:</label>
            <span class="service_value">
                <span id="service_url"></span>
            </span>
            <label class="service_label">Описание:</label>
            <span class="service_value descr">
                <span id="service_descr"></span>
            </span>
        </div> -->
        <label class="row">Изменить название:</label>
        <input autocomplete="off" type="text" id="new_service_name"  class="row">

        <label class="row">Изменить раздел:</label>
        <select id="edit_section" class="row">
            <option value="1">Боевые</option>
            <option value="2">Тест</option>
        </select>

        <label class="row">Изменить адрес:</label>
        <input autocomplete="off" type="text" id="new_service_url" class="row">

        <label class="row">Изменить описание:</label>
        <input autocomplete="off" type="text" id="new_service_descr" class="row">

        <div class="row">
            <button id="edit_service_btn_confirm" class="button button_row">Подтвердить</button>
            <button class="button button_row" id="edit_service_btn_delete">Удалить</button>
            <button class="button" id="edit_service_btn_cancel">Отмена</button>
        </div>

    </div>
