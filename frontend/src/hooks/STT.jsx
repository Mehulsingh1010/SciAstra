import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';

const STT = () => {
    const location = useLocation();  // Get the current location

  // Scroll to top whenever the location changes (i.e., when the page is mounted or navigated to)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]); 
}

// eslint-disable-next-line react-refresh/only-export-components
export default STT
