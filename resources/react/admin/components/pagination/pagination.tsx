type PaginationProps = {
  currentPage: number;
  pagesCount: number;
  handlePageClick: (pageNumber: number) => void;
}

function Pagination(props: PaginationProps): JSX.Element {
  const { currentPage, pagesCount, handlePageClick } = props;

  return (
    <ul className="pagination">
      {currentPage === 1
        ?
        <li className="pagination__item pagination__item--disabled">
          <svg width={6} height={10}>
            <use xlinkHref="#arrow" />
          </svg>
        </li>
        :
        <li className="pagination__item" onClick={() => handlePageClick(currentPage - 1)}>
          <svg width={6} height={10}>
            <use xlinkHref="#arrow" />
          </svg>
        </li>}

      {currentPage > 3 &&
        <li className="pagination__item" onClick={() => handlePageClick(1)}>1</li>}

      {currentPage > 4 &&
        <li className="pagination__item">...</li>}

      {Array.from({ length: pagesCount }, (_, i) => {
        i++;
        if (i >= currentPage - 2 && i <= currentPage + 2) {
          if (i === currentPage) {
            return (
              <li key={i} className="pagination__item pagination__item--current">{i}</li>
            );
          } else {
            return (
              <li key={i} className="pagination__item" onClick={() => handlePageClick(i)}>{i}</li>
            );
          }
        }
        return '';
      })}

      {currentPage < pagesCount - 3 &&
        <li className="pagination__item">...</li>}

      {currentPage < pagesCount - 2 &&
        <li className="pagination__item" onClick={() => handlePageClick(pagesCount)}>
          {pagesCount}
        </li>}

      {currentPage !== pagesCount
        ?
        <li className="pagination__item" onClick={() => handlePageClick(currentPage + 1)}>
          <svg width={6} height={10}>
            <use xlinkHref="#arrow" />
          </svg>
        </li>
        :
        <li className="pagination__item pagination__item--disabled">
          <svg width={6} height={10}>
            <use xlinkHref="#arrow" />
          </svg>
        </li>}
    </ul>
  );
}

export default Pagination;
