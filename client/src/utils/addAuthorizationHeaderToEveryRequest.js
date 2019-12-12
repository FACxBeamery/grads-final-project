import axios from 'axios';

export default () => {
  const token = window.localStorage.getItem('jwt_token');
  const parsedToken = token ? `JWT ${token}` : null;
  axios.defaults.headers.common.Authorization = parsedToken;
};
