export default (axios) => {
  const successHandler = (response) => {
    return response;
  };

  const errorHandler = (error) => {
    if (error.response.status === 401) {
      window.localStorage.removeItem('jwt_token');
    }
    return Promise.reject(error);
  };

  axios.interceptors.response.use(
    (response) => successHandler(response),
    (err) => errorHandler(err),
  );

  return axios;
};
