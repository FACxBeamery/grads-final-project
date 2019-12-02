/* eslint-disable no-undef */
const { initDb, closeDb } = require('../databaseConnection');

const findAdminByCredentials = require('./findAdminByCredentials');

beforeEach(() => {
  return initDb();
});

afterEach(() => {
  return closeDb();
});

it('Testing findAdminByCredentials returns one admin document when the correct credentials are provided.', async () => {
  expect.assertions(6);
  const adminDocument = await findAdminByCredentials('admin', 'admin');
  expect(adminDocument.username).toStrictEqual('admin');
  expect(adminDocument.password).toStrictEqual('admin');
  expect(adminDocument.type).toStrictEqual('admin');
  expect(adminDocument.employeeId).toStrictEqual('123123');
  expect(typeof adminDocument).toBe('object');
  expect(Object.keys(adminDocument)).toEqual([
    '_id',
    'id',
    'username',
    'password',
    'type',
    'employeeId',
  ]);
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
