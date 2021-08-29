import React from 'react';
import ReactDOM from 'react-dom';
import {Detail} from './detail';

var element = document.getElementById('detail');
if (element) {
    
    var json= Object.assign({}, element.dataset);
    const post = JSON.parse(json.post|| '{}');
    const time = json.time || '';

    ReactDOM.render(<Detail post = {post} time={time}/>, document.getElementById('detail'));
}
