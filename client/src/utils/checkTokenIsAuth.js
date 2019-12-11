import axios from 'axios';
import { SET_LOGIN } from '../store/actions/adminLoginActions';

const isTokenAuthed = async (dispatch) => {
  try {
    const token = window.localStorage.getItem('jwt_token');
    const res = await axios.get('/admins', {
      headers: { Authorization: `JWT ${token}` },
    });
    if (res && res.status === 200) {
      const payload = {
        auth: true,
      };
      dispatch({ type: SET_LOGIN, payload });
      return true;
    }
  } catch (err) {
    console.warn(err);
  }
  const payload = {
    auth: false,
  };
  dispatch({ type: SET_LOGIN, payload });
  return false;
};

export default isTokenAuthed;
