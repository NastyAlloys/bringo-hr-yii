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
class Service extends \yii\db\ActiveRecord
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
            'title' => 'Название',
            'descr' => 'Описание',
            'url_string' => 'Адрес',
            'section' => 'Секция',
            'service_id' => 'service_id',
        ];
    }
}
