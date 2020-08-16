import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

import {Route, BrowserRouter as Router} from 'react-router-dom';
import Login from './login/login';
import SignUp from './signUp/signUp';
import Dashboard from './dashboard/dashboard';

const firebase = require("firebase");
require("firebase/firestore");

firebase.initializeApp({
    apiKey: "AIzaSyCkX9Dt5LmOCzhBg7y6Guv6JgN7unr-uOc",
    authDomain: "chatapp-b9036.firebaseapp.com",
    databaseURL: "https://chatapp-b9036.firebaseio.com",
    projectId: "chatapp-b9036",
    storageBucket: "chatapp-b9036.appspot.com",
    messagingSenderId: "422721356006",
    appId: "1:422721356006:web:799f5a13fc6adcef197b27",
    measurementId: "G-JZLN897R23"
});

ReactDOM.render( <Router>
    <div id='routing-container'>
        <Route path="/login" component={Login}></Route>
        <Route path="/signup" component={SignUp}></Route>
        <Route path="/dashboard" component={Dashboard}></Route>
    </div>
</Router>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
