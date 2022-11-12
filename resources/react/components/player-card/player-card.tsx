import { Player } from '../../types/player';

type PlayerProps = {
  player: Player;
}

function PlayersCard({ player }: PlayerProps): JSX.Element {
  const { name, avatar, rating, rank, title, country, flag } = player;

  return (
    <div className="players-card">
      <img
        className="players-card__image"
        src={avatar}
        alt={name}
        width={120}
        height={185}
        loading="lazy"
      />

      <div className="players-card__inner">
        <h3 className="players-card__name">
          {Array.from(name.split(' '), (word, i) =>
            i === 0 ? <span key={i}>{word}, </span> : word
          )}
        </h3>

        <dl className="players-card__details">
          <div className="players-card__detail">
            <dt className="players-card__detail-title">Рейтинг:</dt>
            <dd className="players-card__detail-definition">{rating}</dd>
          </div>

          <div className="players-card__detail">
            <dt className="players-card__detail-title">Ранг:</dt>
            <dd className="players-card__detail-definition">{rank}</dd>
          </div>

          <div className="players-card__detail">
            <dt className="players-card__detail-title">Титул:</dt>
            <dd className="players-card__detail-definition">{title.length > 0 ? title : '-'}</dd>
          </div>

          <div className="players-card__detail">
            <dt className="visually-hidden">Страна</dt>
            <dd className="players-card__detail-definition">
              <img
                className="players-card__country"
                src={flag}
                alt={country}
                width={80}
                height={56}
              />
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

export default PlayersCard;
