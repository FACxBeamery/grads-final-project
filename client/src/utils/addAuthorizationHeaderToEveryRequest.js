import axios from 'axios';

export default () => {
  const token = window.localStorage.getItem('jwt_token');
  if (token) {
    axios.defaults.headers.common.Authorization = `JWT ${token}`;
  } else {
    axios.defaults.headers.common.Authorization = null;
  }
};
