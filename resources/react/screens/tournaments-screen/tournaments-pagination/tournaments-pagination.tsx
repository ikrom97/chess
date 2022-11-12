import { Fragment, useEffect, useState } from 'react';
import Pagination from '../../../components/pagination/pagination';
import TournamentCard from '../../../components/tournament-card/tournament-card';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { paginateTournaments } from '../../../store/api-actions/tournaments-api-actions';
import {
  getPaginatedTournaments,
  getTournamentPagesCount,
} from '../../../store/selectors/tournaments-selector';

function TournamentsPagination(): JSX.Element {
  const dispatch = useAppDispatch();
  const tournaments = useAppSelector(getPaginatedTournaments);
  const pagesCount = useAppSelector(getTournamentPagesCount);
  const params = new URLSearchParams(window.location.search);
  const page = params.get('page') ? Number(params.get('page')) : 1;
  const [currentPage, setCurrentPage] = useState<number>(page);

  useEffect(() => {
    dispatch(paginateTournaments({ currentPage }));
  }, [currentPage, dispatch]);

  return (
    <Fragment>
      <div className="cards-list">
        {Array.from(tournaments, (tournament) =>
          <TournamentCard key={tournament.id} tournament={tournament} />
        )}
      </div>

      <div className="tournaments-screen__pagination">
        {pagesCount > 1 &&
          <Pagination
            currentPage={currentPage}
            pagesCount={pagesCount}
            handlePageLinkClick={setCurrentPage}
          />}
      </div>
    </Fragment>
  );
}

export default TournamentsPagination;
