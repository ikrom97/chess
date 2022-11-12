import { Fragment } from 'react';
import PageFooter from '../../components/UI/page-footer/page-footer';
import PageHeader from '../../components/UI/page-header/page-header';
import { Outlet } from 'react-router-dom';

function Layout(): JSX.Element {
  return (
    <Fragment>
      <PageHeader />

      <Outlet />

      <PageFooter />
    </Fragment>
  );
}

export default Layout;
