import axios from 'axios';

const loginAdmin = async (username, password) => {
  try {
    const response = await axios.post('http://localhost:4000/login', {
      username,
      password,
    });
    console.log(response);
    return response;
  } catch (err) {
    return err.response;
  }
};

export default loginAdmin;
