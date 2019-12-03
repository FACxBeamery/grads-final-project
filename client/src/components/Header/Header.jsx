import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AppBar, Button, Box } from '@material-ui/core';
import styles from './Header.module.css';

const Header = ({ history }) => {
  return (
    <AppBar data-testid='app-bar' position='relative'>
      <h2 className={styles['header']}>
        <span
          onClick={() => history.push(`/admin`)}
          className={styles['clickable']}
        >
          <span className={styles['header-title-vibe']}>vibe@</span>
          <span className={styles['header-title-beamery']}>Beamery</span>
        </span>
      </h2>
      <Box mr={2} className={styles['button']}>
        <Button
          onClick={() => history.push(`/admin`)}
          style={{ backgroundColor: '#FFFFFF' }}
          variant='outlined'
        >
          {' '}
          My Dashboard
        </Button>
      </Box>
    </AppBar>
  );
};

Header.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

export default withRouter(Header);
