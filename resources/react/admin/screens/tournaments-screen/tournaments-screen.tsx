import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AdminRoute } from '../../../const';
import { useAppDispatch } from '../../../hooks';
import { fetchTournaments } from '../../../store/api-actions/tournaments-api-actions';
import { Tournaments } from '../../../types/tournament';

function TournamentsScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const [tournaments, setTournaments] = useState<Tournaments>([]);

  useEffect(() => {
    dispatch(fetchTournaments({
      orderby: 'date',
      ordertype: 'desc',
      count: 10,
      page: 1,
      onSuccess(data) {
        setTournaments(data.tournaments);
      },
    }));
  }, [dispatch]);

  return (
    <main className="page__content content">
      <form className="board">
        <table>
          <caption>
            <h1>Турниры</h1>
            <input type="search" placeholder="Поиск по турнирам" />
            <div>
              <Link to={AdminRoute.TOURNAMENTS_SHOW}>Добавить новое</Link>
            </div>
          </caption>

          <thead>
            <tr>
              <th></th>
              <th>№</th>
              <th>Дата</th>
              <th>Заголовок</th>
              <th>Картинка</th>
              <th>Действия</th>
            </tr>
          </thead>

          <tbody>
            {tournaments.map(({ id, date, title, thumbImage }) => (
              <tr key={id}>
                <td>
                  <label>
                    <input type="checkbox" />
                  </label>
                </td>
                <td>1</td>
                <td>{dayjs(date).format('DD.MM.YYYY')}</td>
                <td>{title}</td>
                <td>
                  <img
                    src={thumbImage}
                    width={300}
                    height={169}
                    alt={title}
                  />
                </td>
                <td>
                  <Link to={AdminRoute.TOURNAMENTS_SHOW}>Редактировать</Link>
                  <button type="button">Удалить</button>
                </td>
              </tr>
            ))}
          </tbody>

          <tfoot>
            <tr>
              <td>
                <label>
                  Строк на странице
                  <select defaultValue={10}>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                    <option value={20}>20</option>
                    <option value={25}>25</option>
                  </select>
                </label>
              </td>
            </tr>
          </tfoot>
        </table>
      </form>
    </main>
  );
}

export default TournamentsScreen;
