import React from 'react';
import ReactDOM from 'react-dom';
import {GPS} from './gps';

var element = document.getElementById('gps');
if (element) {
    ReactDOM.render(<GPS/>, document.getElementById('gps'));
}
