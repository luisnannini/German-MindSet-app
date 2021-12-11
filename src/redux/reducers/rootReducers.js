import { combineReducers } from 'redux';
import applicationsReducer from '../Applications/reducer';

const rootReducer = combineReducers({
  applications: applicationsReducer
});

export default rootReducer;
