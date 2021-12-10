import { combineReducers } from 'redux';
import reducerInterviews from '../Interviews/reducer';

const rootReducer = combineReducers({
  interviews: reducerInterviews
});

export default rootReducer;
