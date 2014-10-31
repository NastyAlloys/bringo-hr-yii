<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;

/* @var $this yii\web\View */
/* @var $model app\models\Task */
/* @var $form ActiveForm */
?>
<div class="site-new-task">

    <?php $form = ActiveForm::begin(); ?>

        <?= $form->field($model, 'creator_id') ?>
        <?= $form->field($model, 'assigned_to_id') ?>
        <?= $form->field($model, 'assigned_to') ?>
        <?= $form->field($model, 'status') ?>
        <?= $form->field($model, 'description') ?>
        <?= $form->field($model, 'subject') ?>
        <?= $form->field($model, 'creator') ?>
        <?= $form->field($model, 'priority') ?>

        <div class="form-group">
            <?= Html::submitButton('Submit', ['class' => 'btn btn-primary']) ?>
        </div>
    <?php ActiveForm::end(); ?>

</div><!-- site-new-task -->
