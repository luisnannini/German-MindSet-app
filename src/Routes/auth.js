import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import Login from 'Components/Auth/Login';
import Register from 'Components/Auth/Register';
import Layout from 'Components/Layout';
import Home from 'Components/Home';

const authRoutes = [
  { name: 'Home', path: '/auth/home' },
  { name: 'Register', path: '/auth/register' },
  { name: 'Login', path: '/auth/login' }
];

const AuthRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <Layout routes={authRoutes}>
      <Switch>
        <Route path={`${url}/login`} component={Login} />
        <Route path={`${url}/register`} component={Register} />
        <Route exact path={`${url}/home`} component={Home} />
        <Redirect to={`${url}/home`} />
      </Switch>
    </Layout>
  );
};

export default AuthRoutes;
