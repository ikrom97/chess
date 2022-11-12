import dayjs from 'dayjs';
import parse from 'html-react-parser';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../../const';
import { Tournament } from '../../../types/tournament';

type UpcomingTournamentProps = {
  tournament: Tournament;
}

function UpcomingTournament({ tournament }: UpcomingTournamentProps): JSX.Element {
  const { image, date, title, content, ticket } = tournament;

  return (
    <main className="upcoming-tournament-screen container">
      <h1 className="upcoming-tournament-screen__category">Предстоящие турниры</h1>

      <img
        className="upcoming-tournament-screen__image"
        src={image}
        alt={title}
        width={600}
        height={340}
        loading="lazy"
      />

      <div className="upcoming-tournament-screen__body">
        <time className="upcoming-tournament-screen__time" dateTime={date}>
          {dayjs(date).format('DD.MM.YYYY')}
        </time>

        <h2 className="upcoming-tournament-screen__title">{title}</h2>

        <div className='upcoming-tournament-screen__content'>{parse(content)}</div>

        <section className="buy-ticket">
          <h2 className="buy-ticket__title">Приобрести билеты</h2>

          <p className="buy-ticket__description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fames tincidunt sociis
            facilisi ac euismod pulvinar bibendum adipiscing. Eget sodales gravida viverra
            sed morbi elementum laoreet. Cum fringilla sodales vel congue mattis quis est
            mauris, nunc.
          </p>

          <dl className="details">
            <div className="details__item">
              <dt className="details__term">
                Адрес офиса:
                <span className="details__icon">
                  <svg width={20} height={20}>
                    <use xlinkHref="#location" />
                  </svg>
                </span>
              </dt>
              <dd className="details__definition">{ticket?.address}</dd>
            </div>
            <div className="details__item">
              <dt className="details__term">
                Телефон:
                <span className="details__icon">
                  <svg width={19} height={20}>
                    <use xlinkHref="#phone" />
                  </svg>
                </span>
              </dt>
              <dd className="details__definition">{ticket?.tel1}</dd>
              <dd className="details__definition">{ticket?.tel2}</dd>
            </div>
            <div className="details__item">
              <dt className="details__term">
                Электронная почта:
                <span className="details__icon">
                  <svg width={20} height={16}>
                    <use xlinkHref="#email" />
                  </svg>
                </span>
              </dt>
              <dd className="details__definition">{ticket?.email1}</dd>
              <dd className="details__definition">{ticket?.email2}</dd>
            </div>
          </dl>
        </section>

        <Link className="upcoming-tournament-screen__all" to={AppRoute.TOURNAMENTS}>
          Вернуться ко всем турнирам
        </Link>
      </div>
    </main>
  );
}

export default UpcomingTournament;
