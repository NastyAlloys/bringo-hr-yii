<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "services_locator".
 *
 * @property string $title
 * @property string $descr
 * @property string $url_string
 * @property string $section
 * @property integer $service_id
 */
class ServicesLocator extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'services_locator';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['title', 'descr', 'url_string', 'section'], 'string']
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'title' => 'Title',
            'descr' => 'Descr',
            'url_string' => 'Url String',
            'section' => 'Section',
            'service_id' => 'Service ID',
        ];
    }
}
