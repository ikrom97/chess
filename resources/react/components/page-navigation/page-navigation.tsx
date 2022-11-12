import { Link, useLocation } from 'react-router-dom';
import { AppRoute, NavigationItems } from '../../const';

function PageNavigation(): JSX.Element {
  const location = useLocation();
  const setClassName = (url: AppRoute): string =>
    location.pathname.includes(url)
      ? 'page-navigation__item page-navigation__item--current'
      : 'page-navigation__item';

  document.body.classList.contains('page__body--menu-shown')
    && document.body.classList.remove('page__body--menu-shown');

  return (
    <ul className="page-navigation">
      {NavigationItems.map(({ url, text }) => {
        if (url === AppRoute.MAIN) {
          if (location.pathname === url) {
            return (
              <li key={url} className="page-navigation__item page-navigation__item--current">
                <span className="page-navigation__link">
                  {text}
                </span>
              </li>);
          }
          return (
            <li key={url} className="page-navigation__item">
              <Link className="page-navigation__link" to={url}>
                {text}
              </Link>
            </li>
          );
        }
        return (
          <li key={url} className={setClassName(url)}>
            {location.pathname === url
              ?
              <span className="page-navigation__link">
                {text}
              </span>
              :
              <Link className="page-navigation__link" to={url}>
                {text}
              </Link>}
          </li>);
      })}
    </ul>
  );
}

export default PageNavigation;
