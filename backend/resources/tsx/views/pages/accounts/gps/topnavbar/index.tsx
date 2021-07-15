import React from 'react';
import './index.css';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

interface Props{
    title: string
}

export const TopNarBar:React.FC<Props> = (props:any) => {
    return(
        <div className="nav-top">
            <h1>{props.title}</h1>
            <div className="arrow-btn">
                <IconButton onClick={() => window.history.back()}>
                    <ArrowBackIcon />
                </IconButton>
            </div>
        </div>
    );
}