import React from 'react';
import ReactDOM from 'react-dom';
import {New} from './new';

if (document.getElementById('new')) {
    ReactDOM.render(<New />, document.getElementById('new'));
}
