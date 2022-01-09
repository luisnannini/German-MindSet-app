import { lazy, Suspense, useEffect } from 'react';
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import { tokenListener } from 'helper/firebase';
import PrivateRoute from 'Routes/PrivateRoute';

const AdminRoutes = lazy(() => import('./admin'));
const PostulantRoutes = lazy(() => import('./postulant'));
const AuthRoutes = lazy(() => import('./auth'));
const HomeRoutes = lazy(() => import('./home'));

const Routes = () => {
  useEffect(() => {
    tokenListener();
  }, []);

  return (
    <Router>
      <Suspense fallback={<div />}>
        <Switch>
          <PrivateRoute path="/postulant" role="POSTULANT" component={PostulantRoutes} />
          <PrivateRoute path="/admin" role="ADMIN" component={AdminRoutes} />
          <Route path="/auth" component={AuthRoutes} />
          <Route exact path="/home" component={HomeRoutes} />
          <Redirect to="/auth/home" />
        </Switch>
      </Suspense>
    </Router>
  );
};

export default Routes;
