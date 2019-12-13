import React from 'react';

import {
  Container,
  Paper,
} from '@material-ui/core';
import useStyles from './styles';

import LoadingWheel from '../../components/LoadingWheel'

// eslint-disable-next-line react/prop-types
const LoadingPage = () => {
  const classes = useStyles();

  return (
    <Container component='main' maxWidth='xs'>
      <Paper className={classes.paper}>
        <LoadingWheel />
      </Paper>
    </Container>
  );
};

export default LoadingPage;
