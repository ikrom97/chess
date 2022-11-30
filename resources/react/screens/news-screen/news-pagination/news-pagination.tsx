import { Fragment, useEffect, useState } from 'react';
import NewsCard from '../../../components/news-card/news-card';
import Pagination from '../../../components/pagination/pagination';
import { useAppDispatch} from '../../../hooks';
import { fetchNews } from '../../../store/api-actions/news-api-actions';
import { News } from '../../../types/news';

function NewsPagination(): JSX.Element {
  const dispatch = useAppDispatch();
  const [news, setNews] = useState<News[]>([]);
  const params = new URLSearchParams(window.location.search);
  const page = params.get('page') ? Number(params.get('page')) : 1;
  const [pagesCount, setPagesCount] = useState<number>(page);
  const [currentPage, setCurrentPage] = useState<number>(page);

  useEffect(() => {
    dispatch(fetchNews({
      sort: 'date',
      order: 'desc',
      count: 16,
      page: currentPage,
      onSuccess(data) {
        setNews(data.news);
        setPagesCount(data.pagination.lastPage);
      },
    }));
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
