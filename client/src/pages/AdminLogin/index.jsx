import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button,
  TextField,
  Typography,
  Container,
  Paper,
} from '@material-ui/core';
import Box from '@material-ui/core/Box';

import { SET_LOGIN, SET_HELPER_TEXT } from '../../store/actions/adminLoginActions';
import { UPDATE_SNACKBAR } from '../../store/actions/snackbarActions';

import useStyles from './styles';
import Copyright from '../../components/Copyright';
import loginAdmin from './apiCalls';

const AdminLogin = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { helperText, data } = useSelector((state) => state.adminLoginReducer);
  const { username, password } = data;

  const setLoginOnChange = (event) => {
    const payload1 = { helperText: '' };
    dispatch({ type: SET_HELPER_TEXT, payload: payload1 });

    const payload2 = {
      [event.target.name]: event.target.value,
    };
    dispatch({ type: SET_LOGIN, payload: payload2 });
  };

  const setLoginOnPost = (auth) => {
    const payload = {
      auth,
    };
    dispatch({ type: SET_LOGIN, payload });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
  
      const response = await loginAdmin(username, password);
      const { auth, token, message } = response.data;
  
      if (auth && token) {
        window.localStorage.setItem('jwt_token', token);
        const payload1 = {
          message,
          variant: 'success',
        };
        dispatch({ type: UPDATE_SNACKBAR, payload: payload1 });
  
        const payload2 = { helperText: '' };
        dispatch({ type: SET_HELPER_TEXT, payload: payload2 });
      } else {
        const payload1 = {
          message,
          variant: 'error',
        };
        dispatch({ type: UPDATE_SNACKBAR, payload: payload1 });
  
        const payload2 = { helperText: message };
        dispatch({ type: SET_HELPER_TEXT, payload: payload2 });
      }
      setLoginOnPost(auth);
    } catch (err) {
      const payload = {
        message: 'An unexpected error occured. Try again later.',
        variant: 'error',
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
      value={username}
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
      value={password}
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