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
  const [tournament, setTournament] = useState<Tournament>({
    id: 0,
    image: '',
    thumbImage: '',
    date: '',
    title: '',
    content: '',
    slug: '',
  });
  const isUpcoming = dayjs(tournament?.date).format('D') >= dayjs().format('D');

  useEffect(() => {
    slug && dispatch(fetchTournamentBySlug({ slug, onSuccess: setTournament }));
  }, [dispatch, slug]);

  return isUpcoming
    ?
    <UpcomingTournament tournament={tournament} />
    :
    <PreviousTournament tournament={tournament} />;
}

export default TournamentsSelectedScreen;
