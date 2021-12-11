import { combineReducers } from 'redux';
import reducerPsychologists from '../Psychologists/reducer';

const rootReducer = combineReducers({
  psychologists: reducerPsychologists
});

export default rootReducer;
