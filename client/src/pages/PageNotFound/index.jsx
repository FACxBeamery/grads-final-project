import React from 'react';
import { Typography, Button, Box } from '@material-ui/core';
import { Link } from 'react-router-dom';
import PageNotFoundImage from './PageNotFoundImage';

const PageNotFound = () => {
  const NotFoundImage = () => {
    return (
      <Box>
        <PageNotFoundImage />
      </Box>
    );
  };
  return (
    <Box display='flex' alignItems='center' justifyContent='center'>
      <Box display='flex' flexDirection='column' alignItems='center'>
        <Box mb={2}>
          <Box display='flex' flexDirection='column' alignItems='center'>
            <Typography gutterBottom color='primary' variant='h2'>
              404
            </Typography>
            <Typography gutterBottom color='primary' variant='h4'>
              Page not found.
            </Typography>
          </Box>
          <NotFoundImage />
        </Box>

        <Box mb={5}>
          <Typography color='primary' variant='h5'>
            Sorry, that page doesn’t exist!
          </Typography>
        </Box>

        <Box display='flex' flexDirection='column' alignItems='center' mb={5}>
          <Typography gutterBottom color='primary' variant='h5'>
            Taking a Survey?
          </Typography>
          <Typography gutterBottom color='secondary' variant='h6'>
            Check if you got the right link
          </Typography>
          <Typography gutterBottom color='primary' variant='h5'>
            Are you an Admin?
          </Typography>
          <Button color='secondary' variant='contained' size='large'>
            <Link
              style={{ color: '#ffffff', textDecoration: 'none' }}
              to={{
                pathname: `/admin/`,
              }}
            >
              Go to Dashboard
            </Link>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default PageNotFound;
