import { Fragment, useEffect, useState } from 'react';
import ArticlesCard from '../../../components/articles-card/articles-card';
import Pagination from '../../../components/pagination/pagination';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { paginateArticles } from '../../../store/api-actions/articles-api-actions';
import {
  getArticlePagesCount,
  getPaginatedArticles
} from '../../../store/selectors/articles-selector';

function ArticlesPagination(): JSX.Element {
  const dispatch = useAppDispatch();
  const articles = useAppSelector(getPaginatedArticles);
  const pagesCount = useAppSelector(getArticlePagesCount);
  const params = new URLSearchParams(window.location.search);
  const page = params.get('page') ? Number(params.get('page')) : 1;
  const [currentPage, setCurrentPage] = useState<number>(page);

  useEffect(() => {
    dispatch(paginateArticles({ currentPage }));
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
