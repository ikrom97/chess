import dayjs from 'dayjs';
import { BaseSyntheticEvent, FormEvent, Fragment, useEffect, useState } from 'react';
import { DebounceInput } from 'react-debounce-input';
import { Link } from 'react-router-dom';
import { AdminRoute } from '../../../const';
import { useAppDispatch } from '../../../hooks';
import { fetchTournaments } from '../../../store/api-actions/tournaments-api-actions';
import { Tournaments } from '../../../types/tournament';
import Pagination from '../../components/pagination/pagination';

function TournamentsScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const [tournaments, setTournaments] = useState<Tournaments>([]);
  const [sort, setSort] = useState<string>('date');
  const [order, setOrder] = useState<string>('desc');
  const [keyword, setKeyword] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [from, setFrom] = useState<number>(0);
  const [to, setTo] = useState<number>(0);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  useEffect(() => {
    dispatch(fetchTournaments({
      sort,
      order,
      count: itemsPerPage,
      page: currentPage,
      keyword,
      onSuccess(data) {
        setTournaments(data.tournaments);
        setTotalPages(data.pagination.lastPage);
        setTotalItems(data.pagination.total);
        setFrom(data.pagination.from);
        setTo(data.pagination.to);
      },
    }));
  }, [currentPage, dispatch, itemsPerPage, keyword, order, sort]);

  const renderOrderType = () => (
    <svg width={12} height={14}>
      {order === 'desc'
        ? <use xlinkHref="#arrow-down-long" />
        : <use xlinkHref="#arrow-up-long" />}
    </svg>
  );

  const handleKeywordChange = (evt: BaseSyntheticEvent) => {
    setKeyword(evt.target.value);
    setCurrentPage(1);
    setSelectedItems([]);
    document.querySelectorAll('tr.selected').forEach((tr) => tr.removeAttribute('class'));
  };

  const handleSortButtonClick = (sortBy: string) => () => {
    if (sort === sortBy) {
      order === 'desc' ? setOrder('asc') : setOrder('desc');
      return;
    }
    setSort(sortBy);
  };

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    setSelectedItems([]);
  };

  const handleItemsPerPageChange = (evt: FormEvent<HTMLSelectElement>) => {
    setCurrentPage(1);
    setItemsPerPage(+evt.currentTarget.value);
  };

  const handleItemClick = (item: number) => (evt: BaseSyntheticEvent) => {
    if (evt.target.tagName !== 'A' && evt.target.tagName !== 'BUTTON') {
      const index = selectedItems.indexOf(item);
      if (index > -1) {
        evt.currentTarget.classList.remove('selected');
        selectedItems.splice(index, 1);
        setSelectedItems([...selectedItems]);
        return;
      }
      evt.currentTarget.classList.add('selected');
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleSelectAll = (evt: BaseSyntheticEvent) => {
    if (evt.target.classList.contains('selected')) {
      setSelectedItems([]);
      evt.target.classList.remove('selected');
      document.querySelectorAll('tr.selected').forEach((tr) => tr.removeAttribute('class'));
      return;
    }
    setSelectedItems(tournaments.map((tournament) => tournament.id));
    evt.target.classList.add('selected');
    document.querySelectorAll('tr').forEach((tr) => tr.classList.add('selected'));
  };

  const handleUnSelect = () => {
    setSelectedItems([]);
    document.querySelectorAll('tr.selected').forEach((tr) => tr.removeAttribute('class'));
  };

  return (
    <main>
      <table>
        <caption>
          <h1>Турниры</h1>

          <DebounceInput
            placeholder="Поиск по турнирам..."
            debounceTimeout={300}
            type="search"
            onChange={handleKeywordChange}
          />

          <Link to={AdminRoute.TOURNAMENTS_SHOW}>Добавить новое</Link>

          {selectedItems.length > 0
            ?
            <Fragment>
              <button onClick={handleUnSelect}>Отменить выбор</button>
              <button className="error">Удалить выбранные ({selectedItems.length})</button>
            </Fragment>
            :
            !keyword.length && <button className="error">Удалить все ({totalItems})</button>}
        </caption>

        <thead>
          <tr>
            <th colSpan={1}>
              <button
                className={selectedItems.length === to ? 'selected' : ''}
                onClick={handleSelectAll}
              >
                <svg width={24} height={24}>
                  <use xlinkHref="#check-all" />
                </svg>
              </button>
            </th>
            <th colSpan={1}>№</th>
            <th colSpan={2}>Картинка</th>
            <th colSpan={3}>
              <button onClick={handleSortButtonClick('date')}>
                Дата {sort === 'date' && renderOrderType()}
              </button>
            </th>
            <th colSpan={11}>
              <button onClick={handleSortButtonClick('title')}>
                Заголовок {sort === 'title' && renderOrderType()}
              </button>
            </th>
            <th colSpan={3}>Статус</th>
            <th colSpan={3}>Действия</th>
          </tr>
        </thead>

        <tbody>
          {tournaments.map(({ id, date, title, thumbImage, slug }, i) => (
            <tr key={id} tabIndex={0} onClick={handleItemClick(id)}>
              <td colSpan={1}>
                <span>
                  <svg width={24} height={24}>
                    <use xlinkHref="#square-check" />
                  </svg>
                </span>
              </td>

              <td colSpan={1}>{from + i}</td>

              <td colSpan={2}>
                <img src={thumbImage} width={300} height={169} alt={title} />
              </td>

              <td colSpan={3}>{dayjs(date).format('DD.MM.YYYY')}</td>

              <td colSpan={11}>{title}</td>

              <td colSpan={3}>
                {dayjs(date).format('DDHH') > dayjs().format('DDHH')
                  ? <span>Предстоящий</span>
                  : <span className="success">Завершенный</span>}
              </td>

              <td colSpan={3}>
                <Link to={`${AdminRoute.TOURNAMENTS_SHOW}?slug=${slug}`} title="Редактировать">
                  <svg width={16} height={16}>
                    <use xlinkHref="#edit" />
                  </svg>
                </Link>
                <button title="Удалить">
                  <svg width={16} height={16}>
                    <use xlinkHref="#delete" />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>

        <tfoot>
          <tr>
            <td>
              <output>{`${from ?? 0} - ${to ?? 0} из ${totalItems}`}</output>

              {totalPages > 1 &&
                <Pagination
                  currentPage={currentPage}
                  pagesCount={totalPages}
                  handlePageClick={handlePageClick}
                />}

              <div>
                Строк на странице
                <select defaultValue={10} onChange={handleItemsPerPageChange}>
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={15}>15</option>
                  <option value={20}>20</option>
                  <option value={25}>25</option>
                </select>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    </main >
  );
}

export default TournamentsScreen;
