import React from 'react'
import IconButton from '@material-ui/core/Button'
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles( (theme) => {
    createStyles({
        button: {
            backgroundColor: theme.palette.primary.main,
            color:  '#000',
            fontSize: 16,
            height: 30,
            marginBottom: 16,
            width: 256,
            "&:hover": {
                backgroundColor: theme.palette.primary.light,
            }
        },
    })
})

const PrimaryButton = (props) => {
    const classes =  useStyles();
    const buttonStyle = props.className
    const icon = props.icon
    const bool = props.bool

    return(
        <div style={{marginTop: 20}}>
            {bool}
            <label htmlFor="icon-button-file">
                <IconButton
                    onClick={ () => props.onClick()}
                    aria-label="upload picture"
                    component="span"
                >
                    {icon}
                </IconButton>
            </label>
        </div>
    )
}

export default PrimaryButton