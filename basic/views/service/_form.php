<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;

/* @var $this yii\web\View */
/* @var $model app\models\ServicesLocator */
/* @var $form yii\widgets\ActiveForm */
?>

<div class="services-locator-form">

    <?php $form = ActiveForm::begin(); ?>

    <?= $form->field($model, 'Название')->textInput() ?>

    <?= $form->field($model, 'descr')->textInput() ?>

    <?= $form->field($model, 'url_string')->textInput() ?>

    <?= $form->field($model, 'section')->textInput() ?>

    <div class="form-group">
        <?= Html::submitButton($model->isNewRecord ? Yii::t('app', 'Create') : Yii::t('app', 'Update'), ['class' => $model->isNewRecord ? 'btn btn-success' : 'btn btn-primary']) ?>
    </div>

    <?php ActiveForm::end(); ?>

</div>
