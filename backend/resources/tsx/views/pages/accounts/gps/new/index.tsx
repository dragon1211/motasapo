import React from 'react';
import ReactDOM from 'react-dom';
import {GPS_New_Post} from './gps_new_post';

if (document.getElementById('gps_new_post')) {
    ReactDOM.render(<GPS_New_Post />, document.getElementById('gps_new_post'));
}
