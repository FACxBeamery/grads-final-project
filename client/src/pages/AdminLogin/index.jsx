import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import ADMIN_ACTIONS from '../../store/actions/adminLoginActions';
import SNACKBAR_ACTIONS from '../../store/actions/snackbarActions';

import useStyles from './styles';
import Copyright from '../../components/Copyright';
import loginAdmin from './apiCalls';

const AdminLogin = () => {
  const [helperText, setHelperText] = useState('');

  const classes = useStyles();
  const dispatch = useDispatch();

  const { SET_LOGIN } = ADMIN_ACTIONS;
  const { OPEN_SNACKBAR } = SNACKBAR_ACTIONS;

  const setLoginOnChange = (event) => {
    setHelperText('');
    const payload = {
      [event.target.name]: event.target.value,
    };
    dispatch({ type: SET_LOGIN, payload });
  };

  const setLoginOnPost = (auth) => {
    const payload = {
      auth,
    };
    dispatch({ type: SET_LOGIN, payload });
  };

  const { username, password } = useSelector(
    (state) => state.adminLoginReducer,
  );

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      // TODO unstub api call response
      const response = await loginAdmin(username, password);
      const { auth, token, message } = response.data;

      if (auth && token) {
        window.localStorage.setItem('jwt_token', token);
        const payload = {
          message,
          variant: 'success',
        };
        dispatch({ type: OPEN_SNACKBAR, payload });
        setHelperText('');
      } else {
        const payload = {
          message,
          variant: 'error',
        };
        dispatch({ type: OPEN_SNACKBAR, payload });
        setHelperText(message);
      }
      setLoginOnPost(auth);
    } catch (err) {
      const payload = {
        message: 'An unexpected error occured. Try again later.',
        variant: 'error',
      };
      dispatch({ type: OPEN_SNACKBAR, payload });
    }
  };

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
      error={helperText !== ''}
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
      error={helperText !== ''}
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
      <div className={classes.paper}>
        <Typography color='primary' variant='h1'>
          Welcome.
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          {usernameInputField}
          {passwordInputField}
          {submitLoginButton}
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default AdminLogin;
