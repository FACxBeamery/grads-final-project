import React from 'react';
import { Typography, Button, Box } from '@material-ui/core';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const PageNotFound = ({ location }) => {
  const { pathname } = location;
  return (
    <Box display='flex' alignItems='center' justifyContent='center'>
      <Box display='flex' flexDirection='column' alignItems='center'>
        <Box mb={5}>
          <Typography color='primary' variant='h5'>
            404: Page not found. We&apos;re sorry, we couldn&apos;t find
{' '}
            {pathname}
{' '}
for you.
</Typography>
        </Box>

        <Box mb={5}>
          <Typography color='primary' variant='h5'>
            Survey recipients, please check the link you have been sent.
          </Typography>
        </Box>

        <Box>
          <Typography color='primary' variant='h5'>
            Are you an admin?
          </Typography>
        </Box>
        <Button color='secondary' variant='contained' size='large'>
          <Link
            style={{ color: '#ffffff', textDecoration: 'none' }}
            to={{
              pathname: `/admin/`,
            }}
          >
            Go to the Dashboard
          </Link>
        </Button>
      </Box>
    </Box>
  );
};

PageNotFound.propTypes = {
  location: PropTypes.shape({ pathname: PropTypes.string }).isRequired,
};

export default PageNotFound;
