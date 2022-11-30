import dayjs from 'dayjs';
import { BaseSyntheticEvent, FormEvent, Fragment, useEffect, useState } from 'react';
import { DebounceInput } from 'react-debounce-input';
import { Link } from 'react-router-dom';
import { AdminRoute } from '../../../const';
import { useAppDispatch } from '../../../hooks';
import { deleteArticles, fetchArticles } from '../../../store/api-actions/articles-api-actions';
import { Articles } from '../../../types/article';
import Modal from '../../components/modal/modal';
import Pagination from '../../components/pagination/pagination';

function ArticlesScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const [articles, setArticles] = useState<Articles>([]);
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
  const [isModalActive, setIsModalActive] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<JSX.Element>(<div></div>);

  useEffect(() => {
    dispatch(fetchArticles({
      sort,
      order,
      count: itemsPerPage,
      page: currentPage,
      keyword,
      onSuccess(data) {
        setArticles(data.articles);
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
    const index = selectedItems.indexOf(item);
    if (index > -1) {
      evt.currentTarget.classList.remove('selected');
      selectedItems.splice(index, 1);
      setSelectedItems([...selectedItems]);
      return;
    }
    evt.currentTarget.classList.add('selected');
    setSelectedItems([...selectedItems, item]);
  };

  const handleSelectAll = (evt: BaseSyntheticEvent) => {
    if (evt.target.classList.contains('selected')) {
      setSelectedItems([]);
      evt.target.classList.remove('selected');
      document.querySelectorAll('tr.selected').forEach((tr) => tr.removeAttribute('class'));
      return;
    }
    setSelectedItems(articles.map((article) => article.id));
    evt.target.classList.add('selected');
    document.querySelectorAll('tr').forEach((tr) => tr.classList.add('selected'));
  };

  const handleUnSelect = () => {
    setSelectedItems([]);
    document.querySelectorAll('tr.selected').forEach((tr) => tr.removeAttribute('class'));
  };

  const handleDeleteAllClick = () => {
    setModalContent(
      <div>
        <p>Вы уверены что хотите удалить все новости?</p>
        <br />
        <br />
        <div className="form__buttons">
          <button
            className="form__button"
            type="button"
            onClick={() => setIsModalActive(false)}
          >
            Отмена
          </button>
          <button
            className="form__button form__button--error"
            type="button"
            onClick={() => dispatch(deleteArticles({
              ids: [],
              onSuccess() {
                setIsModalActive(false);
                setSelectedItems([]);
                dispatch(fetchArticles({
                  sort,
                  order,
                  count: itemsPerPage,
                  page: currentPage,
                  keyword,
                  onSuccess(data) {
                    setArticles(data.articles);
                    setTotalPages(data.pagination.lastPage);
                    setTotalItems(data.pagination.total);
                    setFrom(data.pagination.from);
                    setTo(data.pagination.to);
                  },
                }));
                document.querySelectorAll('th button.selected')
                  .forEach((button) => button.removeAttribute('class'));
              },
            }))}
          >
            Удалить ({totalItems})
          </button>
        </div>
      </div>
    );
    setIsModalActive(true);
  };

  const handleDeleteClick = (id: number) => (evt: BaseSyntheticEvent) => {
    evt.stopPropagation();

    setModalContent(
      <div>
        <p>Вы уверены что хотите удалить эту новость?</p>
        <br />
        <br />
        <div className="form__buttons">
          <button
            className="form__button"
            type="button"
            onClick={() => setIsModalActive(false)}
          >
            Отмена
          </button>
          <button
            className="form__button form__button--error"
            type="button"
            onClick={() => dispatch(deleteArticles({
              ids: [id],
              onSuccess() {
                setIsModalActive(false);
                setSelectedItems([]);
                dispatch(fetchArticles({
                  sort,
                  order,
                  count: itemsPerPage,
                  page: currentPage,
                  keyword,
                  onSuccess(data) {
                    setArticles(data.articles);
                    setTotalPages(data.pagination.lastPage);
                    setTotalItems(data.pagination.total);
                    setFrom(data.pagination.from);
                    setTo(data.pagination.to);
                  },
                }));
                document.querySelectorAll('th button.selected')
                  .forEach((button) => button.removeAttribute('class'));
              },
            }))}
          >
            Удалить
          </button>
        </div>
      </div>
    );

    setIsModalActive(true);
  };

  const handleDeleteSelectedClick = () => {
    setModalContent(
      <div>
        <p>Вы уверены что хотите удалить выбранные новости?</p>
        <br />
        <br />
        <div className="form__buttons">
          <button
            className="form__button"
            type="button"
            onClick={() => setIsModalActive(false)}
          >
            Отмена
          </button>
          <button
            className="form__button form__button--error"
            type="button"
            onClick={() => dispatch(deleteArticles({
              ids: [...selectedItems],
              onSuccess() {
                setIsModalActive(false);
                setSelectedItems([]);
                dispatch(fetchArticles({
                  sort,
                  order,
                  count: itemsPerPage,
                  page: currentPage,
                  keyword,
                  onSuccess(data) {
                    setArticles(data.articles);
                    setTotalPages(data.pagination.lastPage);
                    setTotalItems(data.pagination.total);
                    setFrom(data.pagination.from);
                    setTo(data.pagination.to);
                  },
                }));
                document.querySelectorAll('th button.selected')
                  .forEach((button) => button.removeAttribute('class'));
              },
            }))}
          >
            Удалить ({selectedItems.length})
          </button>
        </div>
      </div>
    );

    setIsModalActive(true);
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

          <Link to={AdminRoute.ARTICLES_SHOW}>Добавить новое</Link>

          {selectedItems.length > 0
            ?
            <Fragment>
              <button onClick={handleUnSelect}>Отменить выбор</button>
              <button
                className="error"
                onClick={handleDeleteSelectedClick}
              >
                Удалить выбранные ({selectedItems.length})
              </button>
            </Fragment>
            :
            !keyword.length && totalItems > 0 &&
            <button
              className="error"
              onClick={handleDeleteAllClick}
            >
              Удалить все ({totalItems})
            </button>}
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
            <th colSpan={14}>
              <button onClick={handleSortButtonClick('title')}>
                Заголовок {sort === 'title' && renderOrderType()}
              </button>
            </th>
            <th colSpan={3}>Действия</th>
          </tr>
        </thead>

        <tbody>
          {articles.map(({ id, date, title, thumbImage, slug }, i) => (
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

              <td colSpan={14}>{title}</td>

              <td colSpan={3}>
                <Link to={`${AdminRoute.ARTICLES_SHOW}?slug=${slug}`} title="Редактировать">
                  <svg width={16} height={16}>
                    <use xlinkHref="#edit" />
                  </svg>
                </Link>
                <button title="Удалить" onClick={handleDeleteClick(id)}>
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

      <Modal isActive={isModalActive} setIsActive={setIsModalActive}>
        {modalContent}
      </Modal>
    </main>
  );
}

export default ArticlesScreen;
