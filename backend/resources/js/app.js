/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

require('./bootstrap');
require('alpinejs');

import React from 'react';
import ReactDOM from 'react-dom';
import DefApp from './DefApp';
import { BrowserRouter } from 'react-router-dom';
import Router from '../js/Router'
import  {Header} from '../tsx/views/layout/Header';

if (document.getElementById('app')) {
    ReactDOM.render(
        <React.StrictMode>
            <BrowserRouter>
                <DefApp />
            </BrowserRouter>
        </React.StrictMode>,
        document.getElementById('app')
    );
}

if (document.getElementById('profile')) {
    ReactDOM.render(
        <React.StrictMode>
            <BrowserRouter>
            <Header title="LOGO"/>
                <Router />
            </BrowserRouter>
        </React.StrictMode>,
        document.getElementById('profile')
    );
}

/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

// require('./components/Example');
