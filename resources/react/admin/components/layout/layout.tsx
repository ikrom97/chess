import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import { useAppDispatch } from '../../../hooks';
import { logoutAction } from '../../../store/api-actions/user-api-actions';

function Layout(): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <Fragment>
      <Outlet />

      <button
        onClick={() => dispatch(logoutAction())}
      >
        Logout
      </button>
    </Fragment>
  );
}

export default Layout;
