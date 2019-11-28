import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import ADMIN_ACTIONS from '../../store/actions/adminLoginActions';

import useStyles from './styles';
import Copyright from '../../components/Copyright';

const AdminLogin = () => {
  const { SET_LOGIN } = ADMIN_ACTIONS;
  const classes = useStyles();

  const dispatch = useDispatch();
  const setLoginOnChange = (event) => {
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

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO unstub api call response
    const response = {
      auth: true,
      token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUxOWYxZjc3YmNmODZjZDc5OTQzOTE3MyIsImlhdCI6MTU3NDkzNzgyOSwiZXhwIjoxNTc0OTQxNDI5fQ.XfwpCljmFN9KAruZMWna6uxbW9e4gTU7XTxT-vEJsN4`,
      message: 'Credentials verified and user logged in.',
    };
    const { auth, token, message } = response;

    if (auth && token) {
      window.localStorage.setItem('jwt_token', token);
      const payload = {
        message,
        variant: 'success',
      };
      dispatch({ type: 'OPEN_SNACKBAR', payload });
    } else {
      const payload = {
        message,
        variant: 'error',
      };
      dispatch({ type: 'OPEN_SNACKBAR', payload });
    }
    setLoginOnPost(auth);
  };

  return (
    <Container component='main' maxWidth='xs'>
      <div className={classes.paper}>
        <Typography color='primary' variant='h1'>
          Welcome.
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
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
          />
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
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='secondary'
            className={classes.submit}
          >
            Sign In
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default AdminLogin;
