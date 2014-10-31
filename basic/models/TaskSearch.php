<?php

namespace app\models;

use Yii;
use yii\base\Model;
use yii\data\ActiveDataProvider;
use app\models\Task;

/**
 * TaskSearch represents the model behind the search form about `app\models\Task`.
 */
class TaskSearch extends Task
{
    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['task_id', 'creator_id', 'assigned_to_id'], 'integer'],
            [['assigned_to', 'status', 'description', 'subject', 'creator', 'priority'], 'safe'],
        ];
    }

    /**
     * @inheritdoc
     */
    public function scenarios()
    {
        // bypass scenarios() implementation in the parent class
        return Model::scenarios();
    }

    /**
     * Creates data provider instance with search query applied
     *
     * @param array $params
     *
     * @return ActiveDataProvider
     */
    public function search($params)
    {
        $query = Task::find();

        $dataProvider = new ActiveDataProvider([
            'query' => $query,
        ]);

        if (!($this->load($params) && $this->validate())) {
            return $dataProvider;
        }

        $query->andFilterWhere([
            'task_id' => $this->task_id,
            'creator_id' => $this->creator_id,
            'assigned_to_id' => $this->assigned_to_id,
        ]);

        $query->andFilterWhere(['like', 'assigned_to', $this->assigned_to])
            ->andFilterWhere(['like', 'status', $this->status])
            ->andFilterWhere(['like', 'description', $this->description])
            ->andFilterWhere(['like', 'subject', $this->subject])
            ->andFilterWhere(['like', 'creator', $this->creator])
            ->andFilterWhere(['like', 'priority', $this->priority]);

        return $dataProvider;
    }
}
