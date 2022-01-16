import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';
import Home from 'Components/Postulants/Home';
import Profile from 'Components/Postulants/Profile';
import EditProfile from 'Components/Postulants/Profile/Form';
import Interviews from 'Components/Postulants/Interviews';
import Layout from 'Components/Layout';

const PostulantRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <Layout
      routes={[
        { name: 'Home', path: '/postulant/home' },
        { name: 'Postulant Profile', path: '/postulant/profile' },
        { name: 'Interviews', path: '/postulant/interviews' },
        { name: 'Logout', path: '/logout' }
      ]}
    >
      <Switch>
        <Route exact path={`${url}/home`} component={Home} />
        <Route exact path={`${url}/profile`} component={Profile} />
        <Route path={`${url}/profile/form`} component={EditProfile} />
        <Route path={`${url}/interviews`} component={Interviews} />
        {/* <Route path={`${url}/logout`} component={Logout} /> */}
        <Redirect to={`${url}/home`} />
      </Switch>
    </Layout>
  );
};

export default PostulantRoutes;
