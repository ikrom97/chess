import dayjs from 'dayjs';
import parse from 'html-react-parser';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../../const';
import { Tournament } from '../../../types/tournament';

type UpcomingTournamentProps = {
  tournament: Tournament;
}

function UpcomingTournament({ tournament }: UpcomingTournamentProps): JSX.Element {
  const { image, date, title, content } = tournament;

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

        <Link className="upcoming-tournament-screen__all" to={AppRoute.TOURNAMENTS}>
          Вернуться ко всем турнирам
        </Link>
      </div>
    </main>
  );
}

export default UpcomingTournament;
