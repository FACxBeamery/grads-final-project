import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import {
  Button,
  TextField,
  Typography,
  Container,
  Paper,
} from '@material-ui/core';
import Box from '@material-ui/core/Box';

import {
  SET_LOGIN,
  SET_HELPER_TEXT,
} from '../../store/actions/adminLoginActions';
import { UPDATE_SNACKBAR } from '../../store/actions/snackbarActions';

import useStyles from './styles';
import { login, unsuccessfulLogin, setAuth } from './eventHandlers';
import Copyright from '../../components/Copyright';
import loginAdmin from './apiCalls';

// eslint-disable-next-line react/prop-types
const AdminLogin = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const { from } = location.state || { from: { pathname: '/admin' } };

  const { helperText, data } = useSelector((state) => state.adminLoginReducer);
  const { username, password } = data;

  useEffect(() => {
    const { auth } = data;
    if (auth) {
      setTimeout(() => history.replace(from), 1);
    }
  }, [from, history, data]);

  const setLoginOnChange = (event) => {
    const helperTextPayload = { helperText: '' };
    dispatch({ type: SET_HELPER_TEXT, payload: helperTextPayload });

    const inputfieldPayload = {
      [event.target.name]: event.target.value,
    };
    dispatch({ type: SET_LOGIN, payload: inputfieldPayload });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const response = await loginAdmin(username, password);
      const { auth, token, message } = response.data;

      if (auth && token) login(dispatch, message, token);
      else unsuccessfulLogin(dispatch, message);

      setAuth(dispatch, auth);
    } catch (err) {
      const payload = {
        open: true,
        snackbar: {
          message: 'An unexpected error occured. Try again later.',
          variant: 'error',
          timeOpened: Date.now(),
        },
      };
      dispatch({ type: UPDATE_SNACKBAR, payload });
    }
  };

  // conditionals
  const isHelperTextEmptyString = helperText !== '';

  // Elements
  const usernameInputField = (
    <TextField
      variant='outlined'
      margin='normal'
      required
      fullWidth
      id='email'
      label='Email Address'
      name='username'
      autoComplete='email'
      value={username || ''}
      onChange={setLoginOnChange}
      color='secondary'
      error={isHelperTextEmptyString}
    />
  );
  const passwordInputField = (
    <TextField
      variant='outlined'
      margin='normal'
      required
      fullWidth
      name='password'
      label='Password'
      type='password'
      id='password'
      value={password || ''}
      onChange={setLoginOnChange}
      autoComplete='current-password'
      color='secondary'
      error={isHelperTextEmptyString}
      helperText={helperText}
    />
  );
  const submitLoginButton = (
    <Button
      type='submit'
      fullWidth
      variant='contained'
      color='secondary'
      className={classes.submit}
    >
      Sign In
    </Button>
  );

  return (
    <Container component='main' maxWidth='xs'>
      <Paper className={classes.paper}>
        <Typography color='primary' variant='h1'>
          Welcome.
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          {usernameInputField}
          {passwordInputField}
          {submitLoginButton}
        </form>
      </Paper>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default AdminLogin;
