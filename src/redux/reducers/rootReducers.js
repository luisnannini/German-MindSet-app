import { combineReducers } from 'redux';
import reducerProfiles from '../Profiles/reducer';
import reducerPsychologists from '../Psychologists/reducer';
import reducerPositions from '../Positions/reducer';

const rootReducer = combineReducers({
  profiles: reducerProfiles,
  psychologists: reducerPsychologists,
  positions: reducerPositions
});

export default rootReducer;
