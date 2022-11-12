import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import PlayersList from '../../../components/players-list/players-list';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { fetchPlayers } from '../../../store/api-actions/players-api-actions';
import { getPlayers, getPlayersLoadedStatus } from '../../../store/selectors/players-selector';

function TopPlayersSection(): JSX.Element {
  const dispatch = useAppDispatch();
  const players = useAppSelector(getPlayers);
  const isPlayersLoaded = useAppSelector(getPlayersLoadedStatus);
  const playersCountPerStep = 12;
  const [renderedPlayersCount, setRenderedPlayersCount] = useState<number>(playersCountPerStep);
  const handleButtonClick = () => setRenderedPlayersCount(renderedPlayersCount + playersCountPerStep);
  const currentMonth = dayjs().month();
  const previousMonth = dayjs().locale('ru').set('month', currentMonth - 1).format('MMMM YYYY');

  useEffect(() => {
    !isPlayersLoaded && dispatch(fetchPlayers());
  }, [dispatch, isPlayersLoaded]);

  return (
    <section className="rating-section">
      <h2 className="rating-section__title">
        {`Топ 100 игроков на ${previousMonth}`}
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

export default TopPlayersSection;
