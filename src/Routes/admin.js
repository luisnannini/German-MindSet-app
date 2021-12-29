import { Switch, Redirect, useRouteMatch } from 'react-router-dom';
import Admins from 'Components/Admin/Admins';
import AdminsForm from 'Components/Admin/Admins/Form';
import Applications from 'Components/Admin/Applications';
import ApplicationsForm from 'Components/Admin/Applications/Form';
import Clients from 'Components/Admin/Clients';
import ClientsForm from 'Components/Admin/Clients/Form';
import Interviews from 'Components/Admin/Interviews';
import InterviewsForm from 'Components/Admin/Interviews/Form';
import Positions from 'Components/Admin/Positions';
import PositionsForm from 'Components/Admin/Positions/Form';
import Postulants from 'Components/Admin/Postulants';
import PostulantsForm from 'Components/Admin/Postulants/Form';
import Profiles from 'Components/Admin/Profiles';
import ProfilesForm from 'Components/Admin/Profiles/Form';
import Psychologists from 'Components/Admin/Psychologists';
import PsychologistsForm from 'Components/Admin/Psychologists/Form';
import Sessions from 'Components/Admin/Sessions';
import SessionsForm from 'Components/Admin/Sessions/Form';
import Layout from 'Components/Layout';
import PrivateRoute from 'Routes/PrivateRoute';

const adminsRoutes = [
  { name: 'Admins', path: '/admin/admins' },
  { name: 'Applications', path: '/admin/applications' },
  { name: 'clients', path: '/admin/clients' },
  { name: 'interviews', path: '/admin/interviews' },
  { name: 'positions', path: '/admin/positions' },
  { name: 'postulants', path: '/admin/postulants' },
  { name: 'profiles', path: '/admin/profiles' },
  { name: 'psychologists', path: '/admin/psychologists' },
  { name: 'sessions', path: '/admin/sessions' }
];

const AdminRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <Layout routes={adminsRoutes}>
      <Switch>
        <PrivateRoute exact path={`${url}/admins`} component={Admins} />
        <PrivateRoute exact path={`${url}/admins/form`} component={AdminsForm} />
        <PrivateRoute exact path={`${url}/applications`} component={Applications} />
        <PrivateRoute exact path={`${url}/applications/form`} component={ApplicationsForm} />
        <PrivateRoute exact path={`${url}/clients`} component={Clients} />
        <PrivateRoute exact path={`${url}/clients/form`} component={ClientsForm} />
        <PrivateRoute exact path={`${url}/interviews`} component={Interviews} />
        <PrivateRoute exact path={`${url}/interviews/form`} component={InterviewsForm} />
        <PrivateRoute exact path={`${url}/positions`} component={Positions} />
        <PrivateRoute exact path={`${url}/positions/form`} component={PositionsForm} />
        <PrivateRoute exact path={`${url}/postulants`} component={Postulants} />
        <PrivateRoute exact path={`${url}/postulants/form`} component={PostulantsForm} />
        <PrivateRoute exact path={`${url}/profiles`} component={Profiles} />
        <PrivateRoute exact path={`${url}/profiles/form`} component={ProfilesForm} />
        <PrivateRoute exact path={`${url}/psychologists`} component={Psychologists} />
        <PrivateRoute exact path={`${url}/psychologists/form`} component={PsychologistsForm} />
        <PrivateRoute exact path={`${url}/sessions`} component={Sessions} />
        <PrivateRoute exact path={`${url}/sessions/form`} component={SessionsForm} />
        <Redirect to={`${url}/admins`} />
      </Switch>
    </Layout>
  );
};

export default AdminRoutes;
