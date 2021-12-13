import { combineReducers } from 'redux';
import reducerProfiles from '../Profiles/reducer';
import reducerPsychologists from '../Psychologists/reducer';

const rootReducer = combineReducers({
  profiles: reducerProfiles,
  psychologists: reducerPsychologists
});

export default rootReducer;
