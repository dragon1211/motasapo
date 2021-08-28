import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';

const StyledMenu = withStyles({
    paper: {
      border: '1px solid #d3d4d5',
      maxWidth: '490px',
      width: '100%', 
      boxShadow: '1px 6px 11px -1px;'
    },
  })((props:any) => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      {...props}
    />
  ));

export const StyledMenus = (props:any) => {
  return (
    <div style={{maxWidth: '492px', width:'100%'}}>
      <StyledMenu id="customized-menu" {...props}/>
    </div>
  );
}
