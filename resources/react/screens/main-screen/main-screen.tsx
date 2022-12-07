import { Link } from 'react-router-dom';
import ChessmenSection from '../../components/chessmen-section/chessmen-section';
import { AppRoute } from '../../const';
import LastNews from './last-news/last-news';
import LastTournaments from './last-tournaments/last-tournaments';
import TopPlayers from './top-players/top-players';

function MainScreen(): JSX.Element {
  return (
    <main className="main-screen">
      <h1 className="visually-hidden">Федерация шахмат Таджикистана</h1>

      <section className="history-section container">
        <h2 className="history-section__title">
          <span>
            <span>История </span>
            <span>федерации <span>шахмат </span>
            </span><span>Таджикистана</span>
          </span>
        </h2>

        <p className="history-section__description">
          Федерация шахмат Таджикистана была образована в 1992 году. В том же году она стала одной из первых среди спортивных федераций независимого Таджикистана, удостоилась возможности стать членом Международной федерации шахмат.
        </p>

        <Link className="history-section__button button" to={AppRoute.ABOUT}>
          Подробнее
        </Link>
      </section>

      <ChessmenSection />

      <section className="tournaments-section container">
        <h2 className="tournaments-section__title">
          <span>
            <span>Последние турниры, организованные</span>
            <span>федерацией <span>шахмат</span></span>
            <span>Таджикистана</span>
          </span>
        </h2>

        <p className="tournaments-section__description">
          На регулярной основе Федерация шахмат Таджикистана проводит турниры среди начинающих и опытных шахматистов страны, стараясь охватывать самый широкий пласт спортсменов. Подобного рода мероприятия помогают развитию шахмат и увеличивают интерес к этой интеллектуальной игре.
        </p>

        <Link className="tournaments-section__button button" to={AppRoute.TOURNAMENTS}>
          Все турниры
        </Link>

        <LastTournaments />
      </section>

      <section className="ratings-section container">
        <h2 className="ratings-section__title">
          <span>
            <span>Рейтинг </span>
            <span>лучших <span>шахматистов</span></span>
            <span>по всему миру</span>
          </span>
        </h2>

        <p className="ratings-section__description">
          Шахматный рейтинг ФИДЕ от Международной шахматной федерации составляется ежемесячно. Топ лучших игроков основан на системе рейтинга Эло. Он вычисляется по результатам игр шахматистов друг с другом. Система рейтингов делит шахматистов на 9 классов: высший класс начинается с рейтинга 2600, низший – 1200 и ниже.
        </p>

        <Link className="ratings-section__button button" to={AppRoute.RATINGS}>
          Весь рейтинг
        </Link>

        <TopPlayers />
      </section>

      <section className="news-section container">
        <h2 className="news-section__title">
          <span>
            <span>Последние новости </span>
            <span>федерации <span>шахмат </span></span>
            <span>Таджикистана</span>
          </span>
        </h2>

        <p className="news-section__description">
          В данном разделе представлены все актуальные новости Федерации Шахмат Таджикистана, а также мировые знаковые события в области шахмат. Результаты турниров, новые звезды, претенденты на звание лучших – все это вы можете узнать на нашем сайте.
        </p>

        <Link className="news-section__button button" to={AppRoute.NEWS}>
          Все новости
        </Link>

        <LastNews />
      </section>
    </main>
  );
}

export default MainScreen;
