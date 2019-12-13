/* eslint-disable no-undef */
const { initDb, closeDb } = require('../databaseConnection');

const findAdminById = require('./findAdminById');
const findAdminByCredentials = require('./findAdminByCredentials');

describe('Testing findAdminById returns one admin document when the correct id is provided.', () => {
  beforeEach(() => {
    return initDb();
  });

  afterEach(() => {
    return closeDb();
  });

  it('Testing findAdminById returns one admin document when the correct id is provided.', async (done) => {
    try {
      expect.assertions(6);
      const { _id } = await findAdminByCredentials('admin', 'admin');
      const adminDocument = await findAdminById(_id);

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

  it('Testing findAdminById returns null when an incorrect id is provided.', async (done) => {
    try {
      expect.assertions(1);
      const adminDocument = await findAdminById('678f1f77bcf86cd645284950');
      expect(adminDocument).toBeNull();
      return done();
    } catch (err) {
      return done(err);
    }
  });
});
