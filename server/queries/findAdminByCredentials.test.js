/* eslint-disable no-undef */
const { initDb, closeDb } = require('../databaseConnection');

const findAdminByCredentials = require('./findAdminByCredentials');

describe('Testing findAdminByCredentials returns one admin document when the correct credentials are provided.', () => {
  beforeEach(() => initDb());
  afterEach(() => closeDb());

  it('Testing findAdminByCredentials returns one admin document when the correct credentials are provided.', async (done) => {
    try {
      expect.assertions(6);
      const adminDocument = await findAdminByCredentials('admin', 'admin');
      expect(adminDocument.username).toStrictEqual('admin');
      expect(adminDocument.password).toStrictEqual('admin');
      expect(adminDocument.type).toStrictEqual('admin');
      expect(adminDocument.employeeId).toStrictEqual('123123');
      expect(typeof adminDocument).toBe('object');
      expect(Object.keys(adminDocument)).toEqual([
        '_id',
        'username',
        'password',
        'type',
        'employeeId',
      ]);
      return done();
    } catch (err) {
      return done(err);
    }
  });

  it('Testing findAdminByCredentials returns null when an incorrect username is provided.', async (done) => {
    try {
      expect.assertions(1);
      const adminDocument = await findAdminByCredentials('incorrect', 'admin');
      expect(adminDocument).toBeNull();

      return done();
    } catch (err) {
      return done(err);
    }
  });

  it('Testing findAdminByCredentials returns null when an incorrect password is provided.', async (done) => {
    try {
      expect.assertions(1);
      const adminDocument = await findAdminByCredentials('admin', 'incorrect');
      expect(adminDocument).toBeNull();

      return done();
    } catch (err) {
      return done(err);
    }
  });
});
