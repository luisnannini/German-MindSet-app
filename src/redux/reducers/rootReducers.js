import { combineReducers } from 'redux';
import reducerSessions from '../Sessions/reducer';

const rootReducer = combineReducers({
  sessions: reducerSessions
});

export default rootReducer;
