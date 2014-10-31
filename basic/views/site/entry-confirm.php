<?php
use yii\helpers\Html;
?>
<p>То, что ты там написал, маленький засранец: </p>

<ul>
  <li><label>Имя</label>: <?= Html::encode($model->name) ?></li>
  <li><label>Почта</label>: <?= Html::encode($model->email) ?></li>
</ul>
