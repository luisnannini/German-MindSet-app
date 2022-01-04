import { Switch, Route, useRouteMatch } from 'react-router-dom';
import Home from 'Components/Postulants/Home';
import Signup from 'Components/Postulants/Signup';
import Profile from 'Components/Postulants/Profile';
import EditProfile from 'Components/Postulants/Profile/Form';
import Layout from 'Components/Layout';

const AdminRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <Layout
      routes={[
        { name: 'Home', path: '/postulant/' },
        { name: 'Signup', path: '/postulant/signup' },
        { name: 'Login', path: '/postulant/login' }
        // { name: 'Postulant Profile', path: '/postulant/profile' }
      ]}
    >
      <Switch>
        <Route exact path={`${url}/`} component={Home} />
        <Route exact path={`${url}/signup`} component={Signup} />
        <Route exact path={`${url}/profile`} component={Profile} />
        <Route path={`${url}/profile/form`} component={EditProfile} />
      </Switch>
    </Layout>
  );
};

export default AdminRoutes;
