/* eslint-disable no-param-reassign */

import join from 'url-join';

import axios from 'axios';

if (process.env.NODE_ENV === 'production') {
  axios.interceptors.request.use(
    function(config) {
      const serverUrl = process.env.REACT_APP_SERVER_URL;
      config.url = join(serverUrl, config.url);
      return config;
    },
    function(error) {
      return Promise.reject(error);
    },
  );
}
