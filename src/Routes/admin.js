import { Switch, Redirect, useRouteMatch, Route } from 'react-router-dom';
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
        <Route exact path={`${url}/admins`} component={Admins} />
        <Route exact path={`${url}/admins/form`} component={AdminsForm} />
        <Route exact path={`${url}/applications`} component={Applications} />
        <Route exact path={`${url}/applications/form`} component={ApplicationsForm} />
        <Route exact path={`${url}/clients`} component={Clients} />
        <Route exact path={`${url}/clients/form`} component={ClientsForm} />
        <Route exact path={`${url}/interviews`} component={Interviews} />
        <Route exact path={`${url}/interviews/form`} component={InterviewsForm} />
        <Route exact path={`${url}/positions`} component={Positions} />
        <Route exact path={`${url}/positions/form`} component={PositionsForm} />
        <Route exact path={`${url}/postulants`} component={Postulants} />
        <Route exact path={`${url}/postulants/form`} component={PostulantsForm} />
        <Route exact path={`${url}/profiles`} component={Profiles} />
        <Route exact path={`${url}/profiles/form`} component={ProfilesForm} />
        <Route exact path={`${url}/psychologists`} component={Psychologists} />
        <Route exact path={`${url}/psychologists/form`} component={PsychologistsForm} />
        <Route exact path={`${url}/sessions`} component={Sessions} />
        <Route exact path={`${url}/sessions/form`} component={SessionsForm} />
        <Redirect to={`${url}/admins`} />
      </Switch>
    </Layout>
  );
};

export default AdminRoutes;
