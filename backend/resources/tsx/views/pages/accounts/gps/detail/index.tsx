import React from 'react';
import ReactDOM from 'react-dom';
import {Detail} from './detail';

if (document.getElementById('detail')) {
    ReactDOM.render(<Detail />, document.getElementById('detail'));
}
