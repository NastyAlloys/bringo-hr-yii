<?php
use yii\helpers\Html;
use yii\bootstrap\Nav;
use yii\bootstrap\NavBar;
use yii\widgets\Breadcrumbs;
use app\assets\AppAsset;

use mdm\admin\components\MenuHelper;

use app\widgets\Alert;

AppAsset::register($this);

?>
<?php $this->beginPage() ?>
<!DOCTYPE html>
<html lang="<?= Yii::$app->language ?>">
    <meta charset="<?= Yii::$app->charset ?>"/>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?= Html::csrfMetaTags() ?>
    <title><?= Html::encode($this->title) ?></title>
    <?php $this->head() ?>
</head>
<body>

<?php $this->beginBody() ?>

<div class='wrap'>
  <?php
    NavBar::begin([
        'brandLabel' => 'Bringo Intranet',
        'brandUrl' => Yii::$app->homeUrl,
        'options' => [
            'class' => 'navbar-inverse navbar-fixed-top',
        ],
    ]);
    echo Nav::widget([
        'options' => ['class' => 'navbar-nav navbar-right'],
        'items' => [
            ['label' => 'Сервисы', 'url' => ['/service/index']],
            ['label' => 'Мой профиль', 'url' => ['/profile/index']],
            ['label' => 'Список сотрудников', 'url' => ['/employees-list/index']],
            ['label' => 'График встреч', 'url' => ['/event-calendar/index']],
            ['label' => 'Список задач', 'url' => ['/task-manager/index']],
            ['label' => 'Новости', 'url' => ['/news/index']],
            Yii::$app->user->isGuest ?
                ['label' => 'Вход', 'url' => ['/site/login']] :
                ['label' => 'Выход (' . Yii::$app->user->identity->username . ')',
                    'url' => ['/site/logout'],
                    'linkOptions' => ['data-method' => 'post']],
          ],
      ]);
      NavBar::end();
?>

    <!-- <div class="ui-layout"> -->
        <!-- <section class="ui-layout_left" id="ui-layout_left">
            <nav class="main_navigation ui-layout_left_block">
                <a href="/main" class="main_mavigation_logo"><img src="css/images/logo.png"></a>
                <ul class="main_navigation_menu">
                    <li><a href="/main">Главная</a></li>
                    <li><a href="/profile">Мой кабинет</a></li>
                    <li><a href="/list_of_employees">Список сотрудников</a></li>
                    <li><a href="/event_calendar">График встреч</a></li>
                    <li><a href="/redmine_manager">Redmine задачки</a></li>
                    <li><a href="/task_manager">Список задач</a></li>
                    <li><a href="/logout">Выйти</a></li>
                </ul>
            </nav>

            <div class="ui-layout_left_block">
                <h3>Новости</h3>
                <article class="ui-layout_left_news">
                    <p class="ui-layout_left_news_date">19.08.2014</p>
                    <p>Здесь будут свежие новости.</p>
                </article>
                <article class="ui-layout_left_news">
                    <p class="ui-layout_left_news_date">15.08.2014</p>
                    <p>Здесь будут старые новости.</p>
                </article>
            </div>
        </section> -->

        <section class="ui-layout_right">
            <!-- <?= Breadcrumbs::widget([
                  'links' => isset($this->params['breadcrumbs']) ? $this->params['breadcrumbs'] : [],
              ]) ?> -->
              <?= $content ?>
        </section>
    <!-- </div> -->
</div>

    <footer class="footer">
        <div class="container">
            <p class="pull-left">&copy; My Company <?= date('Y') ?></p>
            <p class="pull-right"><?= Yii::powered() ?></p>
        </div>
    </footer>
<?php $this->endBody() ?>
</body>
</html>
<?php $this->endPage() ?>
