import dayjs from 'dayjs';
import { generatePath, Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { Tournament } from '../../types/tournament';

type TournamentProps = {
  tournament: Tournament;
  isNew?: boolean;
}

function TournamentCard({ tournament, isNew }: TournamentProps): JSX.Element {
  const { thumbImage, date, title, content, slug } = tournament;

  return (
    <article className={`tournaments-card ${isNew ? 'tournaments-card--new' : ''}`}>
      <img
        className="tournaments-card__image"
        src={thumbImage}
        alt={title}
        width={300}
        height={169}
        loading="lazy"
      />

      <div className="tournaments-card__inner">
        <time className="tournaments-card__time" dateTime={date}>
          {dayjs(date).format('DD.MM.YYYY')}
        </time>

        <h3 className="tournaments-card__title">{title}</h3>

        <div className="tournaments-card__description">{content.replace(/(<([^>]+)>)/ig, '')}</div>

        <Link
          className="tournaments-card__more"
          to={generatePath(AppRoute.TOURNAMENTS_SELECTED, { slug })}
        >
          Подробнее
        </Link>
      </div>
    </article>
  );
}

export default TournamentCard;
