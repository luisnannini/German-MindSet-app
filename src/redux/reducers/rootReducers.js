import { combineReducers } from 'redux';
//import reducers here
import admins from '../Admins/reducer';
import reducerPositions from '../Positions/reducer';
import reducerProfiles from '../Profiles/reducer';
import reducerPsychologists from '../Psychologists/reducer';
import reducerSessions from '../Sessions/reducer';

const rootReducer = combineReducers({
  admins,
  positions: reducerPositions,
  profiles: reducerProfiles,
  psychologists: reducerPsychologists,
  sessions: reducerSessions
});

export default rootReducer;
