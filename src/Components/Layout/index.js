import { Switch, Route, Redirect } from 'react-router-dom';
import Header from '../Header/index';
import Footer from '../Footer/index';
import Admins from '../Admins/index';
import AdminsForm from '../Admins/Form';
import Applications from '../Applications/index';
import ApplicationsForm from '../Applications/Form';
import Clients from '../Clients/index';
import ClientsForm from '../Clients/Form';
import Interviews from '../Interviews/index';
import InterviewsEditForm from '../Interviews/EditForm';
import InterviewsCreateForm from '../Interviews/CreateForm';
import Positions from '../Positions/index';
import PositionsForm from '../Positions/Form';
import Postulants from '../Postulants/index';
import PostulantsAddForm from '../Postulants/Form/Form-Add';
import PostulantsEditForm from '../Postulants/Form/Form-Update';
import Profiles from '../Profiles/index';
import ProfilesForm from '../Profiles/Form';
import Psychologists from '../Psychologists/index';
import PsychologistsForm from '../Psychologists/Form';
import Sessions from '../Sessions/index';
import SessionsForm from '../Sessions/Form';
import Home from '../Home/index';
import styles from './layout.module.css';

function Layout() {
  return (
    <div className={styles.container}>
      <Header />
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route exact path="/admins" component={Admins} />
        <Route exact path="/admins/form" component={AdminsForm} />
        <Route path="/admins/form/:id" component={AdminsForm} />
        <Route exact path="/applications" component={Applications} />
        <Route exact path="/applications/form" component={ApplicationsForm} />
        <Route path="/applications/form/:id" component={ApplicationsForm} />
        <Route exact path="/clients" component={Clients} />
        <Route exact path="/clients/form" component={ClientsForm} />
        <Route path="/clients/form/:id" component={ClientsForm} />
        <Route exact path="/interviews" component={Interviews} />
        <Route exact path="/interviews/form" component={InterviewsCreateForm} />
        <Route path="/interviews/form/:id" component={InterviewsEditForm} />
        <Route exact path="/positions" component={Positions} />
        <Route exact path="/positions/form" component={PositionsForm} />
        <Route path="/positions/form/:id" component={PositionsForm} />
        <Route exact path="/postulants" component={Postulants} />
        <Route exact path="/postulants/form" component={PostulantsAddForm} />
        <Route path="/postulants/form/:id" component={PostulantsEditForm} />
        <Route exact path="/profiles" component={Profiles} />
        <Route exact path="/profiles/form" component={ProfilesForm} />
        <Route path="/profiles/form/:id" component={ProfilesForm} />
        <Route exact path="/psychologists" component={Psychologists} />
        <Route exact path="/psychologists/form" component={PsychologistsForm} />
        <Route path="/psychologists/form/:id" component={PsychologistsForm} />
        <Route exact path="/sessions" component={Sessions} />
        <Route exact path="/sessions/form" component={SessionsForm} />
        <Route path="/sessions/form/:id" component={SessionsForm} />
        <Route path="/">
          <Redirect to="/home" />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default Layout;
