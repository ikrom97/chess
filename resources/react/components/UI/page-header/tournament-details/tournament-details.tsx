import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../../../const';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { fetchUpcomingTournaments } from '../../../../store/api-actions/tournaments-api-actions';
import { getUpcomingTournaments, getUpcomingTournamentsLoadedStatus } from '../../../../store/selectors/tournaments-selector';

function TournamentDetails(): JSX.Element {
  const dispatch = useAppDispatch();
  const upcomingTournaments = useAppSelector(getUpcomingTournaments);
  const isUpcomingTournamentsLoaded = useAppSelector(getUpcomingTournamentsLoadedStatus);

  useEffect(() => {
    !isUpcomingTournamentsLoaded && dispatch(fetchUpcomingTournaments());
  }, [dispatch, isUpcomingTournamentsLoaded]);

  return (
    <Link className="tournament-details" to={`${AppRoute.TOURNAMENTS}#upcoming-tournaments`}>
      <svg className="tournament-details__icon" width={40} height={40}>
        <use xlinkHref="#clock-chess" />
      </svg>
      <div className="tournament-details__inner">
        Предстоящие турниры:
        <small className="tournament-details__count">{upcomingTournaments.length}</small> <br />
        Подробнее
      </div>
    </Link>
  );
}

export default TournamentDetails;
