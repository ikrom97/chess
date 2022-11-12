import { Fragment, useEffect, useState } from 'react';
import NewsCard from '../../../components/news-card/news-card';
import Pagination from '../../../components/pagination/pagination';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { paginateNews } from '../../../store/api-actions/news-api-actions';
import {
  getNewsPagesCount,
  getPaginatedNews,
} from '../../../store/selectors/news-selector';

function NewsPagination(): JSX.Element {
  const dispatch = useAppDispatch();
  const news = useAppSelector(getPaginatedNews);
  const pagesCount = useAppSelector(getNewsPagesCount);
  const params = new URLSearchParams(window.location.search);
  const page = params.get('page') ? Number(params.get('page')) : 1;
  const [currentPage, setCurrentPage] = useState<number>(page);

  useEffect(() => {
    dispatch(paginateNews({ currentPage }));
  }, [currentPage, dispatch]);

  return (
    <Fragment>
      <div className="cards-list">
        {Array.from(news, (item) =>
          <NewsCard key={item.id} news={item} />
        )}
      </div>

      <div className="news-screen__pagination">
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

export default NewsPagination;
