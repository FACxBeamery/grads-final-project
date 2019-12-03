const loginAdmin = (username, password) => {
  // TODO stubbed api call for now
  // eslint-disable-next-line no-unused-vars
  const params = { username, password };

  return new Promise((resolve) => {
    resolve({
      auth: false,
      token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUxOWYxZjc3YmNmODZjZDc5OTQzOTE3MyIsImlhdCI6MTU3NDkzNzgyOSwiZXhwIjoxNTc0OTQxNDI5fQ.XfwpCljmFN9KAruZMWna6uxbW9e4gTU7XTxT-vEJsN4`,
      message: 'Credentials verified and user logged in',
    });
  });
};

export default loginAdmin;
