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
      ? 'main-navigation__item main-navigation__item--current'
      : 'main-navigation__item';

  return (
    <Fragment>
      <aside className="page__sidebar">
        <nav className="main-navigation">
          <img
            className="main-logo"
            src="images/logo-icon.webp"
            width={117}
            height={116}
            alt="Логотип федерации шахмат Таджикистана"
          />

          <ul className="main-navigation__list">
            {AdminNavigations.map(({ url, text }) => {
              if (url === AdminRoute.MAIN) {
                if (location.pathname === url) {
                  return (
                    <li key={url} className="main-navigation__item main-navigation__item--current">
                      <span className="main-navigation__link">
                        {text}
                      </span>
                    </li>);
                }
                return (
                  <li key={url} className="main-navigation__item">
                    <Link className="main-navigation__link" to={url}>
                      {text}
                    </Link>
                  </li>
                );
              }
              return (
                <li key={url} className={setClassName(url)}>
                  {location.pathname === url
                    ?
                    <span className="main-navigation__link">
                      {text}
                    </span>
                    :
                    <Link className="main-navigation__link" to={url}>
                      {text}
                    </Link>}
                </li>);
            })}

            <li className="main-navigation__item">
              <button
                className="main-navigation__link"
                type="button"
                onClick={() => dispatch(logoutAction())}
              >
                Выйти
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      <Outlet />
    </Fragment>
  );
}

export default Layout;
