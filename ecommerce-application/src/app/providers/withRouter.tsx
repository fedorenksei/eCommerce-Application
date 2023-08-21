import { HashRouter } from 'react-router-dom';

export const withRouter = (component: JSX.Element) => (
  <HashRouter>
    <>{component}</>
  </HashRouter>
);
