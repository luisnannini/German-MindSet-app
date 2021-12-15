import { combineReducers } from 'redux';
import reducerProfiles from '../Profiles/reducer';
import reducerPsychologists from '../Psychologists/reducer';
import reducerPostulants from '../Postulants/reducer';

const rootReducer = combineReducers({
  profiles: reducerProfiles,
  psychologists: reducerPsychologists,
  postulants: reducerPostulants
});

export default rootReducer;
