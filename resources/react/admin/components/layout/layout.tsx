import { Fragment } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { AdminNavigations, AdminRoute } from '../../../const';
import { useAppDispatch } from '../../../hooks';
import { logoutAction } from '../../../store/api-actions/user-api-actions';

function Layout(): JSX.Element {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const setClassName = (url: AdminRoute): string =>
    location.pathname.includes(url)
      ? 'dashboard__item dashboard__item--current'
      : 'dashboard__item';

  return (
    <Fragment>
      <aside className="dashboard">
        <img
          className="dashboard__image"
          src="images/logo-icon.webp"
          width={117}
          height={116}
          alt="Логотип федерации шахмат Таджикистана"
        />

        <ul className="dashboard__list">
          {AdminNavigations.map(({ url, text }) => {
            if (url === AdminRoute.MAIN) {
              if (location.pathname === url) {
                return (
                  <li key={url} className="dashboard__item dashboard__item--current">
                    <span className="dashboard__link">
                      {text}
                    </span>
                  </li>);
              }
              return (
                <li key={url} className="dashboard__item">
                  <Link className="dashboard__link" to={url}>
                    {text}
                  </Link>
                </li>
              );
            }
            return (
              <li key={url} className={setClassName(url)}>
                {location.pathname === url
                  ?
                  <span className="dashboard__link">
                    {text}
                  </span>
                  :
                  <Link className="dashboard__link" to={url}>
                    {text}
                  </Link>}
              </li>);
          })}

          <li className="dashboard__item">
            <button
              className="dashboard__link"
              type="button"
              onClick={() => dispatch(logoutAction())}
            >
              Выйти
            </button>
          </li>
        </ul>
      </aside>

      <Outlet />
    </Fragment>
  );
}

export default Layout;
