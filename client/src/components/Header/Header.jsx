import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import styles from './Header.module.css';
import Box from '@material-ui/core/Box';
//import Typography from '@material-ui/core/Typography';
// TODO make header component

const Header = () => {
  return (
    <AppBar
      data-testid='app-bar'
      position='static'
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
