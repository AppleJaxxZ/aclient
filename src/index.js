import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

//REACT ROUTER
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

//CACHING
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';

//PROGRESS WEB APP
import reportWebVitals from './reportWebVitals';

import './index.scss';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <React.StrictMode>
        <Router>
          <App />
        </Router>
      </React.StrictMode>
    </PersistGate>
  </Provider>,

  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
