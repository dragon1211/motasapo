import React from 'react';
import ReactDOM from 'react-dom';
import {GPS} from './gps';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import { Detail } from '../detail/detail';
import { New } from '../new/new';

if (document.getElementById('gps')) {
    
    ReactDOM.render(
        <BrowserRouter>
        <Switch>
            <Route exact path="/account/gps">
                <GPS />
            </Route>
            <Route path="/account/gps/detail">
                <Detail/>
            </Route>
            <Route path="/account/gps/new">
                <New/>
            </Route>
        </Switch>
        </BrowserRouter>, document.getElementById('gps'));
}
