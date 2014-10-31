<?php

use yii\helpers\Html;

/* @var $this yii\web\View */
/* @var $model app\models\ServicesLocator */

$this->title = Yii::t('app', 'Update {modelClass}: ', [
    'modelClass' => 'Services Locator',
]) . ' ' . $model->title;
$this->params['breadcrumbs'][] = ['label' => Yii::t('app', 'Services Locators'), 'url' => ['index']];
$this->params['breadcrumbs'][] = ['label' => $model->title, 'url' => ['view', 'id' => $model->service_id]];
$this->params['breadcrumbs'][] = Yii::t('app', 'Update');
?>
<div class="services-locator-update">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
