import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Layout from './Components/Admin/Layout';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import './index.css';
import './reset.css';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Layout />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
