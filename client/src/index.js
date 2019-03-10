import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import { Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import '../resources/scss/style.scss';

import store from './store';
import { App } from './components';

ReactDOM.render(
    <Router history={createHistory()}>
        <Provider store={store}>
            <Route component={App} />
        </Provider>
    </Router>,
    document.getElementById('root'),
);