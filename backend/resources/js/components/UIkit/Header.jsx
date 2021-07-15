import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles({
    header: {
        width: '100%',
        display: 'flex',
        zIndex: 9999,
        position: 'fixed',
        top: 0,
        backgroundColor: 'white'
    },
    logo: {
        marginTop: 5,
        width: 40,
        height: 40
    }
});

const Header = () => {
    const classes = useStyles();

    return(
        <div className={classes.header}>
            <IconButton onClick={() => window.history.back()}>
                <ArrowBackIcon />
            </IconButton>
            <div style={{ textAlign: "center", width: '80%' }}>
                <img className={classes.logo} src={'/storage/base/logo-square.png'} />
            </div>
        </div>
    )
}

export default Header;