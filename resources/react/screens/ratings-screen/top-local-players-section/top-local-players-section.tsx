import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import PlayersList from '../../../components/players-list/players-list';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { fetchLocalPlayers } from '../../../store/api-actions/players-api-actions';
import { getLocalPlayers, getLocalPlayersLoadedStatus } from '../../../store/selectors/players-selector';

function TopLocalPlayersSection(): JSX.Element {
  const dispatch = useAppDispatch();
  const players = useAppSelector(getLocalPlayers);
  const isPlayersLoaded = useAppSelector(getLocalPlayersLoadedStatus);
  const playersCountPerStep = 12;
  const [renderedPlayersCount, setRenderedPlayersCount] = useState<number>(playersCountPerStep);
  const handleButtonClick = () => setRenderedPlayersCount(renderedPlayersCount + playersCountPerStep);

  useEffect(() => {
    !isPlayersLoaded && dispatch(fetchLocalPlayers());
  }, [dispatch, isPlayersLoaded]);

  return (
    <section className="rating-section">
      <h2 className="rating-section__title">
        {`Топ активных таджикских игроков на ${dayjs().format('YYYY')}`}
      </h2>

      <PlayersList players={players.slice(0, renderedPlayersCount)} />

      {players.length > renderedPlayersCount &&
        <button className="rating-section__button" onClick={handleButtonClick}>
          Показать еще <span>{playersCountPerStep}</span>
          <svg className="rating-section__button-icon" width={6} height={10}>
            <use xlinkHref="#arrow"></use>
          </svg>
        </button>}
    </section>
  );
}

export default TopLocalPlayersSection;
