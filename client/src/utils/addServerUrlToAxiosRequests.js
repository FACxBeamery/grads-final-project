/* eslint-disable no-param-reassign */

import join from 'url-join';

import axios from 'axios';

axios.interceptors.request.use(
  function(config) {
    const serverUrl = 'http://localhost:4000'; // process.env.REACT_APP_SERVER_URL;
    config.url = join(serverUrl, config.url);
    return config;
  },
  function(error) {
    return Promise.reject(error);
  },
);
