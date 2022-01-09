import { Switch, Route, useRouteMatch } from 'react-router-dom';
import Home from 'Components/Home';
import Signup from 'Components/Postulants/Signup';
import Layout from 'Components/Layout';
import LoginForm from 'Components/Auth/Login';

const HomeRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <Layout
      routes={[
        { name: 'Home', path: '/auth/home' },
        { name: 'Register', path: '/auth/register' },
        { name: 'Login', path: '/auth/login' }
      ]}
    >
      <Switch>
        <Route exact path={`${url}/auth/home`} component={Home} />
        <Route exact path={`${url}/auth/register`} component={Signup} />
        <Route exact path={`${url}/auth/login`} component={LoginForm} />
      </Switch>
    </Layout>
  );
};

export default HomeRoutes;
