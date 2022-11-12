import { Routes, Route } from 'react-router-dom';
import browserHistory from '../../browser-history';
import { AppRoute } from '../../const';
import AboutScreen from '../../screens/about-screen/about-screen';
import ArticlesScreen from '../../screens/articles-screen/articles-screen';
import ArticlesSelectedScreen from '../../screens/articles-selected-screen/articles-selected-screen';
import ContactsScreen from '../../screens/contacts-screen/contacts-screen';
import Layout from '../../screens/layout/layout';
import MainScreen from '../../screens/main-screen/main-screen';
import NewsScreen from '../../screens/news-screen/news-screen';
import NewsSelectedScreen from '../../screens/news-selected-screen/news-selected-screen';
import NotFoundScreen from '../../screens/not-found-screen/not-found-screen';
import RatingsScreen from '../../screens/ratings-screen/ratings-screen';
import TournamentsScreen from '../../screens/tournaments-screen/tournaments-screen';
import TournamentsSelectedScreen from '../../screens/tournaments-selected-screen/tournaments-selected-screen';
import HistoryRouter from '../history-route/history-route';
import ScrollToTop from '../scroll-to-top/scroll-to-top';
import 'swiper/css';
import 'swiper/css/scrollbar';

function App(): JSX.Element {
  return (
    <HistoryRouter history={browserHistory}>
      <ScrollToTop />

      <Routes>
        <Route path={AppRoute.MAIN} element={<Layout />}>
          <Route index element={<MainScreen />} />

          <Route path={AppRoute.NEWS} element={<NewsScreen />} />

          <Route path={AppRoute.NEWS_SELECTED} element={<NewsSelectedScreen />} />

          <Route path={AppRoute.TOURNAMENTS} element={<TournamentsScreen />} />

          <Route path={AppRoute.TOURNAMENTS_SELECTED} element={<TournamentsSelectedScreen />} />

          <Route path={AppRoute.RATINGS} element={<RatingsScreen />} />

          <Route path={AppRoute.ARTICLES} element={<ArticlesScreen />} />

          <Route path={AppRoute.ARTICLES_SELECTED} element={<ArticlesSelectedScreen />} />

          <Route path={AppRoute.CONTACTS} element={<ContactsScreen />} />
        </Route>

        <Route path={AppRoute.ABOUT} element={<AboutScreen />} />

        <Route path={AppRoute.NOT_FOUND} element={<NotFoundScreen />} />
      </Routes>
    </HistoryRouter>
  );
}

export default App;
