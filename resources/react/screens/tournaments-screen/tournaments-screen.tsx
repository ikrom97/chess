import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchUpcomingTournaments } from '../../store/api-actions/tournaments-api-actions';
import { getUpcomingTournaments, getUpcomingTournamentsLoadedStatus }
  from '../../store/selectors/tournaments-selector';
import TournamentsPagination from './tournaments-pagination/tournaments-pagination';
import UpcomingTournaments from './upcoming-tournaments/upcoming-tournaments';

function TournamentsScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const tournaments = useAppSelector(getUpcomingTournaments);
  const isTournamensLoaded = useAppSelector(getUpcomingTournamentsLoadedStatus);

  useEffect(() => {
    if (!isTournamensLoaded) {
      dispatch(fetchUpcomingTournaments({ sort: 'date', order: 'asc' }));
    }
  }, [dispatch, isTournamensLoaded]);

  return (
    <main className="tournaments-screen container">
      <h1 className="visually-hidden">Турниры</h1>

      {tournaments.length > 0 &&
        <section className="tournaments-screen__upcoming-tournaments upcoming-tournaments">
          <h2 className="upcoming-tournaments__title">Предстоящие турниры</h2>

          <p className="upcoming-tournaments__description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fames tincidunt sociis
            facilisi ac euismod pulvinar bibendum adipiscing. Eget sodales gravida viverra sed
            morbi elementum laoreet. Cum fringilla sodales vel congue mattis quis est mauris,
            nunc.
          </p>

          <UpcomingTournaments />
        </section>}

      <section className="tournaments-screen__previous-tournaments previous-tournaments">
        <h2 className="previous-tournaments__title">Предыдущие турниры</h2>

        <p className="previous-tournaments__description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fames tincidunt sociis
          facilisi ac euismod pulvinar bibendum adipiscing. Eget sodales gravida viverra sed
          morbi elementum laoreet. Cum fringilla sodales vel congue mattis quis est mauris,
          nunc.
        </p>

        <TournamentsPagination />
      </section>
    </main>
  );
}

export default TournamentsScreen;
