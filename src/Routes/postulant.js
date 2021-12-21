import { Switch, Route, useRouteMatch } from 'react-router-dom';
import Home from '../Components/Postulants/Home';
import Signup from '../Components/Postulants/Signup';
import Layout from '../Components/Layout';

const AdminRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <Layout
      routes={[
        { name: 'Home', path: '/postulant/' },
        { name: 'Go to admin app', path: '/admin' },
        { name: 'Signup', path: '/postulant/signup' }
      ]}
    >
      <Switch>
        <Route exact path={`${url}/`} component={Home} />
        <Route exact path={`${url}/signup`} component={Signup} />
      </Switch>
    </Layout>
  );
};

export default AdminRoutes;
