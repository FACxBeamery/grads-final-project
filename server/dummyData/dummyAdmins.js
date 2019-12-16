const { ObjectID } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();

module.exports = [
  {
    _id: ObjectID('519f1f77bcf86cd799439173'),
    username: process.env.VIBE_U,
    password: process.env.VIBE_P,
    type: 'admin',
    employeeId: '123123',
  },
];
