<?php

use yii\helpers\Html;
use yii\grid\GridView;

/* @var $this yii\web\View */
/* @var $dataProvider yii\data\ActiveDataProvider */

$this->title = 'Наши сервисы';
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="service-index">

    <div class="container">

      <h1><?= Html::encode($this->title) ?></h1>

      <p><?= Html::a('Новый сервис', ['create'], ['class' => 'btn btn-success']) ?></p>

      <div class="ui-main_services row">
          <h2>Боевые</h2>
          <div class="row" id="battle_row" data-value="1"></div>
          <h2>Тест</h2>
          <div class="row" id="test_row" data-value="2"></div>
      </div>
    </div>

    <!-- <?= GridView::widget([
        'dataProvider' => $dataProvider,
        'columns' => [
            ['class' => 'yii\grid\SerialColumn'],

            'title',
            'descr',
            'url_string:url',
            'section',
            'service_id',

            ['class' => 'yii\grid\ActionColumn'],
        ],
    ]); ?> -->

</div>
