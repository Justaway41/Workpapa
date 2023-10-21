import 'babel-polyfill'; // to fix IE 11 page loading issue
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import TagManager from 'react-gtm-module';

import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/css/bootstrap-theme.min.css';
// import 'react-select/dist/react-select.css';
// import 'jquery/dist/jquery.min';
// import 'draft-js/dist/Draft.css';

import configureStore from './store/configureStore';
// import './assets/vendor/font-awesome-5.0.8/css/fontawesome.min.css';
// import './assets/vendor/font-awesome-5.0.8/css/fa-regular.min.css';
// import './assets/vendor/font-awesome-5.0.8/css/fa-brands.min.css';
// import './assets/vendor/font-awesome-5.0.8/css/fa-solid.min.css';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

const tagManagerArgs = {
    gtmId: 'GTM-MTFCWWG',
    dataLayerName: 'DataLayer'
};

TagManager.initialize(tagManagerArgs);

const store = configureStore();


ReactDOM.render(
    <Provider store={store}>
        <Router >
            <App />
        </Router>
    </Provider>
    , document.getElementById('root')
);
registerServiceWorker();
