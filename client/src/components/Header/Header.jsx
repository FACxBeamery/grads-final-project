/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AppBar, Button, Box } from '@material-ui/core';
import styles from './Header.module.css';

const Header = ({ history }) => {
  const { data } = useSelector((state) => state.adminLoginReducer);
  const { auth } = data;
  const isAdmin = auth;

  const goToAdminDashboard = () => {
    if (isAdmin) {
      history.push(`/admin`);
    }
  };
  const DashboardButton = () => (
    <span
      className={styles.clickable}
      onClick={goToAdminDashboard}
      role='button'
      tabIndex='0'
    >
      <span className={styles['header-title-vibe']}>vibe@</span>
      <span className={styles['header-title-beamery']}>Beamery</span>
    </span>
  );
  const SurveyTakerHeader = () => (
    <span>
      <span className={styles['header-title-vibe']}>vibe@</span>
      <span className={styles['header-title-beamery']}>Beamery</span>
    </span>
  );

  const dashboardButton = (
    <Button onClick={() => history.push(`/admin`)} style={{ color: '#FFFFFF' }}>
      My Dashboard
    </Button>
  );

  const logoutButton = isAdmin && (
    <Button
      onClick={() => {
        window.localStorage.removeItem('jwt_token');
        history.push(`/admin/login`);
      }}
      style={{ color: '#FFFFFF' }}
    >
      Logout
    </Button>
  );

  return (
    <AppBar data-testid='app-bar' position='relative'>
      <h2 className={styles.header}>
        {isAdmin ? <DashboardButton /> : <SurveyTakerHeader />}
      </h2>
      {isAdmin && (
        <Box mr={2} className={styles.button}>
          {dashboardButton}
          {logoutButton}
        </Box>
      )}
    </AppBar>
  );
};

Header.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
  location: PropTypes.shape({ pathname: PropTypes.string }).isRequired,
};

export default withRouter(Header);
