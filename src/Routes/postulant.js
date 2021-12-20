import { Switch, Route, useRouteMatch } from 'react-router-dom';
import Home from '../Components/Postulants/Home';
import Signup from '../Components/Postulants/Signup';
import Layout from '../Components/Layout';

const AdminRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <Layout routes={[{ name: 'Go to admin app', path: '/admin' }]}>
      <Switch>
        <Route exact path={`${url}/`} component={Home} />
        <Route path={`${url}/signup`} component={Signup} />
      </Switch>
    </Layout>
  );
};

export default AdminRoutes;
