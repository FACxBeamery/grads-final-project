import {
  SET_LOGIN,
  SET_HELPER_TEXT,
} from '../../store/actions/adminLoginActions';
import { UPDATE_SNACKBAR } from '../../store/actions/snackbarActions';

const login = (dispatch, message, token) => {
  window.localStorage.setItem('jwt_token', token);
  const snackbarPayload = {
    message,
    variant: 'success',
  };
  const helperTextPayload = { helperText: '' };

  dispatch({ type: UPDATE_SNACKBAR, payload: snackbarPayload });
  dispatch({ type: SET_HELPER_TEXT, payload: helperTextPayload });
};

const unsuccessfulLogin = (dispatch, message) => {
  const snackbarPayload = {
    message,
    variant: 'error',
  };
  const helperTextPayload = { helperText: message };

  dispatch({ type: UPDATE_SNACKBAR, payload: snackbarPayload });
  dispatch({ type: SET_HELPER_TEXT, payload: helperTextPayload });
};

const setAuth = (dispatch, auth) => {
  const payload = {
    auth,
  };
  dispatch({ type: SET_LOGIN, payload });
};

// eslint-disable-next-line import/prefer-default-export
export { login, unsuccessfulLogin, setAuth };
