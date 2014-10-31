<?php
/* @var $this yii\web\View */
?>
<h1>event-calendar/index</h1>

  <div class="content">
      <h1>График встреч</h1>
      <div id='calendar'></div>
  </div>
  <!-- Modal -->
  <div id="event" class="message_box pop_up" title="Событие" style="display: none;">
      <form>
          <p>
              <label for="event_name">Название события: </label>
              <input type="text" id="event_name" name="event_name" value="" autocomplete="off">
          </p>
          <p>
              <label for="event_date">Дата: </label>
              <input type="text" id="event_date" class="time_interval datepicker" name="event_date" value="" autocomplete="off" style="width: 100px" placeholder="дд.мм.гггг">
              <input type="text" id="event_date_end" class="time_interval datepicker" name="event_date" autocomplete="off" style="width: 100px; display: none" placeholder="дд.мм.гггг">
          </p>
          <p>
              <label for="event_start_time">Начало: </label>
              <!--<input type="text" id="event_start_date" class="time_interval datepicker" name="event_start_date" value="" autocomplete="off" style="width: 100px" placeholder="дд.мм.гг">-->
              <input type="text" id="event_start_time" class="time_interval" name="event_start_time" value="" autocomplete="off" style="width: 100px" placeholder="00:00">
              <label for="event_end_time">Окончание: </label>
              <!--<input type="text" id="event_end_date" class="time_interval datepicker" name="event_end_date" value="" autocomplete="off" style="width: 100px" placeholder="дд.мм.гг">-->
              <input type="text" id="event_end_time" class="time_interval" name="event_end_time" value="" autocomplete="off" style="width: 100px" placeholder="00:00">
          </p>
          <p>
              <label for="event_description">Описание: </label>
              <textarea id="event_description" name="event_end_time"></textarea>
          </p>
          <p>
              <label for="select_guests">Добавить гостей: </label>
              <select class="select_guests" id="select_guests" multiple="multiple"></select>
          </p>
          <!--
              <label for="event_file_upload">Загрузить документ: </label>
              <input type="file" id="event_file_upload" style="display: inline-block;">
          </p>-->
          <input type="button" value="Сохранить" class="button button_row" id="new_event_btn"><input type="button" value="Изменить" class="button button_row" id="edit_event_btn" style="display: none"><input type="button" value="Удалить событие" class="button button_row" id="delete_event_btn" style="display: none"><input type="button" class="button button_row">
      </form>
  </div>
