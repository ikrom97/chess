import { Link, useLocation } from 'react-router-dom';
import { AppRoute } from '../../const';

function MainLogo(): JSX.Element {
  const location = useLocation();
  const isMainPage = location.pathname === AppRoute.MAIN;

  return isMainPage
    ?
    <div className="main-logo">
      <picture>
        <source media="(min-width:992px)" srcSet="/images/logo-extended.webp" />
        <source media="(min-width:576px)" srcSet="/images/logo-tablet.webp" />
        <img
          className="main-logo__image"
          src="/images/logo-mobile.svg"
          width={169}
          height={44}
          alt="Федерация шахмат Таджикистана"
          loading="lazy"
        />
      </picture>
    </div>
    :
    <Link className="main-logo" to={AppRoute.MAIN}>
      <picture>
        <source media="(min-width:992px)" srcSet="/images/logo-desktop.webp" />
        <source media="(min-width:576px)" srcSet="/images/logo-tablet.webp" />
        <img
          className="main-logo__image"
          src="/images/logo-mobile.svg"
          width={169}
          height={44}
          alt="Федерация шахмат Таджикистана"
        />
      </picture>
    </Link>;
}

export default MainLogo;
