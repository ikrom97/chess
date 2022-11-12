import { useLocation } from 'react-router-dom';
import { AppRoute } from '../../../const';
import MainLogo from '../../main-logo/main-logo';
import PageNavigation from '../../page-navigation/page-navigation';
import TournamentDetails from './tournament-details/tournament-details';

function PageHeader(): JSX.Element {
  const location = useLocation();
  const isMainPage = location.pathname === AppRoute.MAIN;

  const handleButtonClick = () => document.body.classList.toggle('page__body--menu-shown');

  return (
    <header className={isMainPage ? 'page-header page-header--main' : 'page-header'}>
      <nav className="main-navigation container">
        <MainLogo />

        <button
          className="main-navigation__toggler"
          onClick={handleButtonClick}
          type="button"
        >
          <span className="visually-hidden">Переключатель меню</span>
          <svg className="main-navigation__menu-icon" width={32} height={32}>
            <use xlinkHref="#menu"></use>
          </svg>
          <svg className="main-navigation__close-icon" width={32} height={32}>
            <use xlinkHref="#close"></use>
          </svg>
        </button>

        <PageNavigation />

        <TournamentDetails />
      </nav>

      {isMainPage &&
        <>
          <picture>
            <source media="(min-width:992px)" srcSet="/images/banner-desktop.webp" />
            <source media="(min-width:576px)" srcSet="/images/banner-tablet.webp" />
            <img
              className="page-header__banner"
              src="/images/banner-mobile.webp"
              width={320}
              height={213}
              alt="Шахматная доска"
            />
          </picture>
          <span className="page-header__icon">
            <svg width={10} height={24}>
              <use xlinkHref="#chessman" />
            </svg>
          </span>
        </>}
    </header>
  );
}

export default PageHeader;
