import { Fragment, useEffect, useState } from 'react';
import Pagination from '../../../components/pagination/pagination';
import TournamentCard from '../../../components/tournament-card/tournament-card';
import { useAppDispatch } from '../../../hooks';
import { fetchPreviousTournaments } from '../../../store/api-actions/tournaments-api-actions';
import { Tournaments } from '../../../types/tournament';

function TournamentsPagination(): JSX.Element {
  const dispatch = useAppDispatch();
  const [tournaments, setTournaments] = useState<Tournaments>([]);
  const params = new URLSearchParams(window.location.search);
  const page = params.get('page') ? Number(params.get('page')) : 1;
  const [currentPage, setCurrentPage] = useState<number>(page);
  const [pagesCount, setPagesCount] = useState<number>(0);

  useEffect(() => {
    dispatch(fetchPreviousTournaments({
      sort: 'date',
      order: 'desc',
      count: 8,
      page: currentPage,
      onSuccess(data) {
        setTournaments(data.tournaments);
        setPagesCount(data.pagination.lastPage);
      },
    }));
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
