import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';
import Home from 'Components/Postulants/Home';
import Profile from 'Components/Postulants/Profile';
import EditProfile from 'Components/Postulants/Profile/Form';
import Layout from 'Components/Layout';

const PostulantRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <Layout
      routes={[
        { name: 'Home', path: '/postulant/home' },
        { name: 'Profile', path: '/postulant/profile' },
        { name: 'Logout', path: '/logout' }
      ]}
    >
      <Switch>
        <Route exact path={`${url}/home`} component={Home} />
        <Route exact path={`${url}/profile`} component={Profile} />
        <Route path={`${url}/profile/form`} component={EditProfile} />
        {/* <Route path={`${url}/logout`} component={Logout} /> */}
        <Redirect to={`${url}/home`} />
      </Switch>
    </Layout>
  );
};

export default PostulantRoutes;
