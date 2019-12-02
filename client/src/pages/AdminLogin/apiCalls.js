import axios from 'axios';

const loginAdmin = async (username, password) => {
  try {
    const response = await axios.post('/login', {
      username,
      password,
    });
    return response;
  } catch (err) {
    return err.response;
  }
};

export default loginAdmin;
