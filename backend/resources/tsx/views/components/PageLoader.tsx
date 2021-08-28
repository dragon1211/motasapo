import React, { useState, useEffect }from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import CSS from 'csstype';

const loader: CSS.Properties = {
    zIndex: 10,
    position: 'fixed',
    top: '0px'
};

const getWidth = () => {
    return (document.getElementsByClassName('wrap-inner')[0].clientWidth / 2 - 20)
}

const getHeight = () => {
    return (window.innerHeight / 2 - 20)
}

export const  PageLoader =  () =>  {
  // save current window width in the state object
  let [width, setWidth] = useState(getWidth());
  let [height, setHeight] = useState(getHeight());

  // in this case useEffect will execute only once because
  // it does not have any dependencies.
  useEffect(() => {
    const resizeListener = () => {
      // change width from the state object
      setWidth(getWidth())
      setHeight(getHeight())
    };
    // set resize listener
    window.addEventListener('resize', resizeListener);

    setWidth(getWidth())
    setHeight(getHeight())
    // clean up function
    return () => {
      // remove resize listener
      window.removeEventListener('resize', resizeListener);
    }
   
  }, [])

  return (
    <div style={loader}>
        <CircularProgress color="secondary" style={{top:height, left:width, position:'relative'}}/>
    </div>
  );
}