import React from 'react';
import ReactDOM from 'react-dom';
import {CommentBox} from './commentbox';

if(document.getElementById('comment')){
    ReactDOM.render(
        <CommentBox/>,
        document.getElementById('comment')
    )
}