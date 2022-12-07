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
            Для увеличения интереса к шахматам как среди подрастающего поколения, так и среди взрослых людей, Федерация шахмат Таджикистана планирует и дальше проводить турниры и другие мероприятия. Это позволит постоянно развиваться, повышать уровень игроков для дальнейшего участия в Международных турнирах.
          </p>

          <UpcomingTournaments />
        </section>}

      <section className="tournaments-screen__previous-tournaments previous-tournaments">
        <h2 className="previous-tournaments__title">Предыдущие турниры</h2>

        <p className="previous-tournaments__description">
          На регулярной основе Федерация шахмат Таджикистана проводит турниры среди начинающих и опытных шахматистов страны, стараясь охватывать самый широкий пласт спортсменов. Подобного рода мероприятия помогают развитию шахмат и увеличивают интерес к этой интеллектуальной игре.
        </p>

        <TournamentsPagination />
      </section>
    </main>
  );
}

export default TournamentsScreen;
