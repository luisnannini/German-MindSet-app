import { combineReducers } from 'redux';
import reducerProfiles from '../Profiles/reducer';

const rootReducer = combineReducers({
  profiles: reducerProfiles
});

export default rootReducer;
