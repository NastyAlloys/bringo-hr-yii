<?php

use yii\helpers\Html;


/* @var $this yii\web\View */
/* @var $model app\models\ServicesLocator */

$this->title = Yii::t('app', 'Create {modelClass}', [
    'modelClass' => 'Services Locator',
]);
$this->params['breadcrumbs'][] = ['label' => Yii::t('app', 'Services Locators'), 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="services-locator-create">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
