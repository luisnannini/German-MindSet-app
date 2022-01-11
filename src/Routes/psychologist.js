import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';
import Home from 'Components/Psychologist/Home';
import Layout from 'Components/Layout';

const PsychologistRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <Layout
      routes={[
        { name: 'Home', path: '/psychologist/home' },
        { name: 'Logout', path: '/logout' }
      ]}
    >
      <Switch>
        <Route exact path={`${url}/home`} component={Home} />
        {/* <Route path={`${url}/logout`} component={Logout} /> */}
        <Redirect to={`${url}/home`} />
      </Switch>
    </Layout>
  );
};

export default PsychologistRoutes;
