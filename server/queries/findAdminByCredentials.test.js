/* eslint-disable no-undef */
const { ObjectID } = require('mongodb');
const { initDb, closeDb } = require('../databaseConnection');

const findAdminByCredentials = require('./findAdminByCredentials');

beforeEach(() => {
  return initDb();
});

afterEach(() => {
  return closeDb();
});

it('Testing findAdminByCredentials returns one admin document when the correct credentials are provided.', async () => {
  expect.assertions(2);
  const adminDocument = await findAdminByCredentials('admin', 'admin');
  const id = ObjectID('519f1f77bcf86cd799439173');
  expect(adminDocument).toStrictEqual({
    _id: id,
    username: 'admin',
    password: 'admin',
    type: 'admin',
    employeeId: '123123',
  });
  expect(typeof adminDocument).toBe('object');
});

it('Testing findAdminByCredentials returns null when an incorrect username is provided.', async () => {
  expect.assertions(1);
  const adminDocument = await findAdminByCredentials('incorrect', 'admin');
  expect(adminDocument).toBeNull();
});

it('Testing findAdminByCredentials returns null when an incorrect password is provided.', async () => {
  expect.assertions(1);
  const adminDocument = await findAdminByCredentials('admin', 'incorrect');
  expect(adminDocument).toBeNull();
});
