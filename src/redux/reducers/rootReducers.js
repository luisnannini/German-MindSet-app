import { combineReducers } from 'redux';
import admins from '../Admins/reducer';
import applicationsReducer from '../Applications/reducer';
import reducerClients from '../Clients/reducer';
import reducerInterviews from '../Interviews/reducer';
import reducerPositions from '../Positions/reducer';
import reducerProfiles from '../Profiles/reducer';
import reducerPsychologists from '../Psychologists/reducer';
import reducerSessions from '../Sessions/reducer';
import reducerPostulants from '../Postulants/reducer';

const rootReducer = combineReducers({
  admins,
  applications: applicationsReducer,
  clients: reducerClients,
  interviews: reducerInterviews,
  positions: reducerPositions,
  profiles: reducerProfiles,
  psychologists: reducerPsychologists,
  sessions: reducerSessions,
  postulants: reducerPostulants
});

export default rootReducer;
