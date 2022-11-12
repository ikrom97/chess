import dayjs from 'dayjs';
import parse from 'html-react-parser';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../../const';
import { Tournament } from '../../../types/tournament';

type PreviousTournamentProps = {
  tournament: Tournament;
}

function PreviousTournament({ tournament }: PreviousTournamentProps): JSX.Element {
  const { image, date, title, content } = tournament;

  return (
    <main className="tournaments-selected-screen container">
      <h1 className="tournaments-selected-screen__category">Предыдущие турниры</h1>

      <img
        className="tournaments-selected-screen__image"
        src={image}
        width={600}
        height={340}
        alt={title}
        loading="lazy"
      />

      <div className="tournaments-selected-screen__right">
        <time className="tournaments-selected-screen__time" dateTime={date}>
          {dayjs(date).format('DD.MM.YYYY')}
        </time>

        <h2 className="tournaments-selected-screen__title">{title}</h2>

        <div className="tournaments-selected-screen__body">{parse(content)}</div>

        <Link className="tournaments-selected-screen__all" to={AppRoute.TOURNAMENTS}>
          Вернуться ко всем турнирам
        </Link>
      </div>
    </main>
  );
}

export default PreviousTournament;
