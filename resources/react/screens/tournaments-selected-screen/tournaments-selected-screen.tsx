import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { fetchTournamentBySlug } from '../../store/api-actions/tournaments-api-actions';
import { Tournament } from '../../types/tournament';
import PreviousTournament from './previous-tournament/previous-tournament';
import UpcomingTournament from './upcoming-tournament/upcoming-tournament';

function TournamentsSelectedScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const params = useParams();
  const slug = params.slug;
  const [tournament, setTournament] = useState<Tournament | null>(null);

  const isUpcoming = dayjs(tournament?.date).format('YYYYMMDDHH') > dayjs().format('YYYYMMDDHH');

  useEffect(() => {
    slug && dispatch(fetchTournamentBySlug({ slug, onSuccess: setTournament }));
  }, [dispatch, slug]);

  if (!tournament) {
    return <div></div>;
  }

  return isUpcoming
    ?
    <UpcomingTournament tournament={tournament} />
    :
    <PreviousTournament tournament={tournament} />;
}

export default TournamentsSelectedScreen;
