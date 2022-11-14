import { Navigate } from 'react-router-dom';
import { AdminRoute, AuthorizationStatus } from '../../const';
import { useAppSelector } from '../../hooks';
import { getAuthorizationStatus } from '../../store/selectors/user-selector';

type PrivateRouteProps = {
  children: JSX.Element;
}

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const { children } = props;
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  return (
    authorizationStatus === AuthorizationStatus.AUTH
      ? children
      : <Navigate to={AdminRoute.LOGIN} />
  );
}

export default PrivateRoute;
