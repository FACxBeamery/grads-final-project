import React from 'react';
import { Typography, Button, Box } from '@material-ui/core';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const NoPageFound = ({ location }) => {
  const { pathname } = location;
  return (
    <Box display='flex' alignItems='center' justifyContent='center'>
      <Box display='flex' flexDirection='column' alignItems='center'>
        <Box mb={5}>
          <Typography color='primary' variant='h5'>
            We&apos;re sorry, We couldn&apos;t find 
{' '}
{pathname}
{' '}
for you.
</Typography>
        </Box>
        <Button color='secondary' variant='contained' size='large'>
          <Link
            style={{ color: '#ffffff', textDecoration: 'none' }}
            to={{
              pathname: `/admin/`,
            }}
          >
            Take me to the Dashboard
          </Link>
        </Button>
      </Box>
    </Box>
  );
};

NoPageFound.propTypes = {
  location: PropTypes.shape({ pathname: PropTypes.string }).isRequired,
};

export default NoPageFound;
