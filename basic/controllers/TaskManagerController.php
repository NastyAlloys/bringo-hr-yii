<?php

namespace app\controllers;

class TaskManagerController extends \yii\web\Controller
{
    public function actionIndex()
    {
        return $this->render('index');
    }

}
