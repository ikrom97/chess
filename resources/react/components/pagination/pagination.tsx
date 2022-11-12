import { Link } from 'react-router-dom';

type PaginationProps = {
  currentPage: number;
  pagesCount: number;
  handlePageLinkClick: (pageNumber: number) => void;
}

function Pagination(props: PaginationProps): JSX.Element {
  const { currentPage, pagesCount, handlePageLinkClick } = props;

  return (
    <ul className="pagination">
      {currentPage === 1
        ?
        <li className="pagination__item pagination__item--disabled">
          <span className="pagination__link">
            <svg width={6} height={10}>
              <use xlinkHref="#arrow" />
            </svg>
          </span>
        </li>
        :
        <li className="pagination__item">
          <Link
            className="pagination__link"
            to={`?page=${currentPage - 1}`}
            onClick={() => handlePageLinkClick(currentPage - 1)}
          >
            <svg width={6} height={10}>
              <use xlinkHref="#arrow" />
            </svg>
          </Link>
        </li>}

      {currentPage > 3 &&
        <li className="pagination__item">
          <Link
            className="pagination__link"
            to="?page=1"
            onClick={() => handlePageLinkClick(1)}
          >
            1
          </Link>
        </li>}

      {currentPage > 4 &&
        <li className="pagination__item">
          <span className="pagination__link">...</span>
        </li>}

      {Array.from({ length: pagesCount }, (_, i) => {
        i++;
        if (i >= currentPage - 2 && i <= currentPage + 2) {
          if (i === currentPage) {
            return (
              <li key={i} className="pagination__item pagination__item--current">
                <span className="pagination__link">{i}</span>
              </li>
            );
          } else {
            return (
              <li key={i} className="pagination__item">
                <Link
                  className="pagination__link"
                  to={`?page=${i}`}
                  onClick={() => handlePageLinkClick(i)}
                >
                  {i}
                </Link>
              </li>
            );
          }
        }
        return '';
      })}

      {currentPage < pagesCount - 3 &&
        <li className="pagination__item">
          <span className="pagination__link">...</span>
        </li>}

      {currentPage < pagesCount - 2 &&
        <li className="pagination__item">
          <Link
            className="pagination__link"
            to={`?page=${pagesCount}`}
            onClick={() => handlePageLinkClick(pagesCount)}
          >
            {pagesCount}
          </Link>
        </li>}

      {currentPage !== pagesCount
        ?
        <li className="pagination__item">
          <Link
            className="pagination__link"
            to={`?page=${currentPage + 1}`}
            onClick={() => handlePageLinkClick(currentPage + 1)}
          >
            <svg width={6} height={10}>
              <use xlinkHref="#arrow" />
            </svg>
          </Link>
        </li>
        :
        <li className="pagination__item pagination__item--disabled">
          <span className="pagination__link">
            <svg width={6} height={10}>
              <use xlinkHref="#arrow" />
            </svg>
          </span>
        </li>}
    </ul>
  );
}

export default Pagination;
