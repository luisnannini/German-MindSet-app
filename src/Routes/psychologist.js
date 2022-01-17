import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';
import Home from 'Components/Psychologist/Home';
import Layout from 'Components/Layout';
import Logout from 'Components/Shared/Logout';

const PsychologistRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <Layout routes={[{ name: 'Logout', path: '/psychologist/logout' }]}>
      <Switch>
        <Route exact path={`${url}/home`} component={Home} />
        <Route exact path={`${url}/logout`} component={Logout} />
        <Redirect to={`${url}/home`} />
      </Switch>
    </Layout>
  );
};

export default PsychologistRoutes;
