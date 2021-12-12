import { combineReducers } from 'redux';
import reducerPositions from '../Positions/reducer';
//import reducers here

const rootReducer = combineReducers({
  positions: reducerPositions
  //insert reducers here
});

export default rootReducer;
