import axios from 'axios';

const loginAdmin = async (username, password) => {
  try {
    const response = await axios.post('http://localhost:4000/login', {
      username,
      password,
    });
    return response.data;
  } catch (err) {
    return err.response.data;
  }
};

export default loginAdmin;
