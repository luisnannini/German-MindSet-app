import { combineReducers } from 'redux';
import reducerClients from '../Clients/reducer';

const rootReducer = combineReducers({
  clients: reducerClients
});

export default rootReducer;
