import React from 'react';
import { AppBar, Box } from '@material-ui/core';
import styles from './Header.module.css';
// TODO make header component

const Header = () => {
  return (
    <AppBar data-testid='app-bar' position='static'>
      <Box className={styles['header-title']}>
        <h2 className={styles['header-title-vibe']}>Vibe@</h2>
        <h2 className={styles['header-title-beamery']}> Beamery</h2>
      </Box>
    </AppBar>
  );
};

export default Header;
