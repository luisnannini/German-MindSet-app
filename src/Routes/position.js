import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';
import Position from 'Components/Position';
import MainPage from 'Components/Home';
import Layout from 'Components/Layout';

const PositionRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <Layout routes={[{ name: 'Logout', path: '/logout' }]}>
      <Switch>
        <Route exact path={`${url}/`} component={Position} />
        <Route path={`${url}/logout`} component={MainPage} />
        <Redirect to={`${url}/home`} />
      </Switch>
    </Layout>
  );
};

export default PositionRoutes;
