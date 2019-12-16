/* eslint-disable no-undef */
const dotenv = require('dotenv');
const { initDb, closeDb } = require('../databaseConnection');

dotenv.config();
const findAdminByCredentials = require('./findAdminByCredentials');

describe('Testing findAdminByCredentials returns one admin document when the correct credentials are provided.', () => {
  beforeEach(() => initDb());
  afterEach(() => closeDb());

  it('Testing findAdminByCredentials returns one admin document when the correct credentials are provided.', async (done) => {
    try {
      expect.assertions(6);
      const adminDocument = await findAdminByCredentials(
        process.env.VIBE_U,
        process.env.VIBE_P,
      );
      expect(adminDocument.username).toStrictEqual(process.env.VIBE_U);
      expect(adminDocument.password).toStrictEqual(process.env.VIBE_P);
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
      const adminDocument = await findAdminByCredentials(
        'incorrect',
        'IsThisAPassWordddd',
      );
      expect(adminDocument).toBeNull();

      return done();
    } catch (err) {
      return done(err);
    }
  });

  it('Testing findAdminByCredentials returns null when an incorrect password is provided.', async (done) => {
    try {
      expect.assertions(1);
      const adminDocument = await findAdminByCredentials(
        'ohIMANADMIN',
        'incorrect',
      );
      expect(adminDocument).toBeNull();

      return done();
    } catch (err) {
      return done(err);
    }
  });
});
