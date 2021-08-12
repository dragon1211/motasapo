import React from 'react';
import ReactDOM from 'react-dom';
import {New_Post} from './new_post';

if (document.getElementById('new_post')) {
    ReactDOM.render(<New_Post />, document.getElementById('new_post'));
}
