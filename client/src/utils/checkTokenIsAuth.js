import axios from 'axios';
import { SET_LOGIN } from '../store/actions/adminLoginActions';
import { UPDATE_SNACKBAR } from '../store/actions/snackbarActions';

const isTokenAuthed = async (dispatch, currentAuth) => {
  try {
    const token = window.localStorage.getItem('jwt_token');
    const res = await axios.get('/admins', {
      headers: { Authorization: `JWT ${token}` },
    });
    if (res && res.status === 200 && currentAuth === false) {
      const payload = {
        auth: true,
      };
      dispatch({ type: SET_LOGIN, payload });
      return true;
    }
  } catch (err) {
    const res = err.response;

    if (res && res.status === 401 && currentAuth === true) {
      const payload = {
        auth: false,
      };
      const snackbarPayload = {
        message: 'Unauthorised: Please log in',
        variant: 'error',
      };

      dispatch({ type: SET_LOGIN, payload });
      dispatch({ type: UPDATE_SNACKBAR, payload: snackbarPayload });
      return false;
    }
  }
  return false;
};

export default isTokenAuthed;
