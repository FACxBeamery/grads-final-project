// __mocks__/apiCalls.js

const users = {
  username: 'steven.bianchi@beamery.com',
  password: 'steven.bianchi@beamery.com',
};

const mockLoginAdmin = (username, password) => {
  const params = { username, password };

  return new Promise((resolve) => {
    if (params.username === '' || params.password === '')
      return resolve({ data: { message: 'Missing credentials' } });

    if (
      params.username === users.username &&
      params.password === users.password
    )
      return resolve({
        data: {
          auth: true,
          token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUxOWYxZjc3YmNmODZjZDc5OTQzOTE3MyIsImlhdCI6MTU3NDkzNzgyOSwiZXhwIjoxNTc0OTQxNDI5fQ.XfwpCljmFN9KAruZMWna6uxbW9e4gTU7XTxT-vEJsN4`,
          message: 'Credentials verified and user logged in. MOCKED',
        },
      });

    return resolve({
      data: {
        message: 'Bad credentials. Username and password do not match.',
      },
    });
  });
};

export default mockLoginAdmin;
