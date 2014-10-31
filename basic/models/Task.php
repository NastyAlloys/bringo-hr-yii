<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "task_manager".
 *
 * @property integer $task_id
 * @property integer $creator_id
 * @property string $assigned_to
 * @property integer $assigned_to_id
 * @property string $status
 * @property string $description
 * @property string $subject
 * @property string $creator
 * @property string $priority
 */
class Task extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'task_manager';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['creator_id', 'assigned_to_id'], 'integer'],
            [['assigned_to', 'status', 'description', 'subject', 'creator', 'priority'], 'string']
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'task_id' => 'Task ID',
            'creator_id' => 'Creator ID',
            'assigned_to' => 'Assigned To',
            'assigned_to_id' => 'Assigned To ID',
            'status' => 'Status',
            'description' => 'Description',
            'subject' => 'Subject',
            'creator' => 'Creator',
            'priority' => 'Priority',
        ];
    }

    public function actionNewTask()
    {
        $model = new app\models\Task();

        if ($model->load(Yii::$app->request->post())) {
            if ($model->validate()) {
                // form inputs are valid, do something here
                return;
            }
        }

        return $this->render('site/new-task', [
            'model' => $model,
        ]);
    }

}
