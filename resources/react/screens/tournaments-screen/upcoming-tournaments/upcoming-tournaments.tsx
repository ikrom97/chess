import { useEffect } from 'react';
import TournamentCard from '../../../components/tournament-card/tournament-card';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { fetchUpcomingTournaments } from '../../../store/api-actions/tournaments-api-actions';
import {
  getUpcomingTournaments,
  getUpcomingTournamentsLoadedStatus,
} from '../../../store/selectors/tournaments-selector';

function UpcomingTournaments(): JSX.Element {
  const dispatch = useAppDispatch();
  const tournaments = useAppSelector(getUpcomingTournaments);
  const isTournamensLoaded = useAppSelector(getUpcomingTournamentsLoadedStatus);

  useEffect(() => {
    if (!isTournamensLoaded) {
      dispatch(fetchUpcomingTournaments({sort: 'date', order: 'asc'}));
    }
  }, [dispatch, isTournamensLoaded]);

  return (
    <div className="cards-list">
      {Array.from(tournaments, (tournament) =>
        <TournamentCard key={tournament.id} tournament={tournament} isNew />
      )}
    </div>
  );
}

export default UpcomingTournaments;
