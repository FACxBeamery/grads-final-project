import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import styles from './Header.module.css';
// import Typography from '@material-ui/core/Typography';

const Header = () => {
  return (
    <AppBar
      position='static'
      data-testid='app-bar'
      className={styles['header-bar']}
    >
      <Box className={styles['header-title']}>
        <h2 className={styles['header-title-vibe']}>Vibe@</h2>

        <h2 className={styles['header-title-beamery']}> Beamery</h2>
      </Box>
    </AppBar>
  );
};

export default Header;
