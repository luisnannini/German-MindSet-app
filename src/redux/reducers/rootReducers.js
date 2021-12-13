import { combineReducers } from 'redux';
import admins from '../Admins/reducer';
import reducerInterviews from '../Interviews/reducer';
import reducerPositions from '../Positions/reducer';
import reducerProfiles from '../Profiles/reducer';
import reducerPsychologists from '../Psychologists/reducer';
import reducerSessions from '../Sessions/reducer';

const rootReducer = combineReducers({
  admins,
  interviews: reducerInterviews,
  positions: reducerPositions,
  profiles: reducerProfiles,
  psychologists: reducerPsychologists,
  sessions: reducerSessions
});

export default rootReducer;
