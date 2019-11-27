import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import styles from './Header.module.css';
import Typography from '@material-ui/core/Typography';
// TODO make header component

const Header = () => {
  return (
    <AppBar className={styles['header-bar']}>
      <div className={styles['header-title']}>
        <h2 className={styles['header-title-vibe']}>Vibe@</h2>
        {/* <Typography >
          <h2>Vibe@</h2>
        </Typography> */}
        <h2 className={styles['header-title-beamery']}> Beamery</h2>
        {/* <Typography
          color='secondary'
         
          variant='h4'
        >
       
        </Typography> */}
      </div>
    </AppBar>
  );
};

export default Header;
