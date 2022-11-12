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
          Федерация шахмат Таджикистана была образована в 1992 году и в том же году,
          стала одной из первых среди спортивных федераций независимого Таджикистана,
          стала членом Международной федерации своего вида спорта.
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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.Fames tincidunt
          sociis facilisi ac euismod pulvinar bibendum adipiscing. Eget sodales
          gravida viverra sed morbi elementum laoreet. Cum fringilla sodales vel
          congue mattis quis est mauris, nunc.
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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fames tincidunt
          sociis facilisi ac euismod pulvinar bibendum adipiscing. Eget sodales
          gravida viverra sed morbi elementum laoreet. Cumfringilla sodales vel
          congue mattis quis est mauris, nunc.
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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fames tincidunt
          sociis facilisi ac euismod pulvinar bibendum adipiscing. Eget sodales
          gravida viverra sed morbi elementum laoreet. Cum fringilla sodales vel
          congue mattis quis est mauris, nunc.
        </p>

        <Link className="news-section__button button" to={AppRoute.NEWS}>
          Все новости
        </Link>

        <LastNews />

        <p className="news-section__description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fames tincidunt
          sociis facilisi ac euismod pulvinar bibendum adipiscing. Eget sodales
          gravida viverra sed morbi elementum laoreet. Cum fringilla sodales vel
          congue mattis quis est mauris, nunc.
        </p>
      </section>
    </main>
  );
}

export default MainScreen;
