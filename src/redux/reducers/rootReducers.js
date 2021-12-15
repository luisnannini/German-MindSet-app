import { combineReducers } from 'redux';
import reducerAdmins from '../Admins/reducer';
import reducerApplications from '../Applications/reducer';
import reducerClients from '../Clients/reducer';
import reducerInterviews from '../Interviews/reducer';
import reducerPositions from '../Positions/reducer';
import reducerProfiles from '../Profiles/reducer';
import reducerPsychologists from '../Psychologists/reducer';
import reducerSessions from '../Sessions/reducer';

const rootReducer = combineReducers({
  admins: reducerAdmins,
  applications: reducerApplications,
  clients: reducerClients,
  interviews: reducerInterviews,
  positions: reducerPositions,
  profiles: reducerProfiles,
  psychologists: reducerPsychologists,
  sessions: reducerSessions
});

export default rootReducer;
