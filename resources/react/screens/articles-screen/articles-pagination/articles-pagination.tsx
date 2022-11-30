import { Fragment, useEffect, useState } from 'react';
import ArticlesCard from '../../../components/articles-card/articles-card';
import Pagination from '../../../components/pagination/pagination';
import { useAppDispatch } from '../../../hooks';
import { fetchArticles } from '../../../store/api-actions/articles-api-actions';
import { Articles } from '../../../types/article';

function ArticlesPagination(): JSX.Element {
  const dispatch = useAppDispatch();
  const [articles, setArticles] = useState<Articles>([]);
  const params = new URLSearchParams(window.location.search);
  const page = params.get('page') ? Number(params.get('page')) : 1;
  const [pagesCount, setPagesCount] = useState<number>(page);
  const [currentPage, setCurrentPage] = useState<number>(page);

  useEffect(() => {
    dispatch(fetchArticles({
      sort: 'date',
      order: 'desc',
      count: 16,
      page: currentPage,
      onSuccess(data) {
        setArticles(data.articles);
        setPagesCount(data.pagination.lastPage);
      },
    }));
  }, [currentPage, dispatch]);

  return (
    <Fragment>
      <div className="cards-list">
        {Array.from(articles, (item) =>
          <ArticlesCard key={item.id} article={item} />
        )}
      </div>

      <div className="articles-screen__pagination">
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

export default ArticlesPagination;
