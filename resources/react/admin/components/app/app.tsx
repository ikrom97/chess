import { Route, Routes } from 'react-router-dom';
import browserHistory from '../../../browser-history';
import HistoryRouter from '../../../components/history-route/history-route';
import ScrollToTop from '../../../components/scroll-to-top/scroll-to-top';
import { AdminRoute, AppRoute, AuthorizationStatus } from '../../../const';
import LoginScreen from '../../screens/login-screen/login-screen';
import NotFoundScreen from '../../../screens/not-found-screen/not-found-screen';
import Layout from '../layout/layout';
import MainScreen from '../../screens/main-screen/main-screen';
import TournamentsScreen from '../../screens/tournaments-screen/tournaments-screen';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { getAuthorizationStatus } from '../../../store/selectors/user-selector';
import { redirectToRoute } from '../../../store/action';

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  if (authorizationStatus !== AuthorizationStatus.AUTH) {
    dispatch(redirectToRoute(AdminRoute.LOGIN));
  }

  return (
    <HistoryRouter history={browserHistory}>
      <ScrollToTop />
      <ToastContainer />

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path={AdminRoute.MAIN} element={<MainScreen />} />

          <Route path={AdminRoute.TOURNAMENTS} element={<TournamentsScreen />} />
        </Route>

        <Route path={AdminRoute.LOGIN} element={<LoginScreen />} />

        <Route path={AppRoute.NOT_FOUND} element={<NotFoundScreen />} />
      </Routes>
    </HistoryRouter>
  );
}

export default App;
