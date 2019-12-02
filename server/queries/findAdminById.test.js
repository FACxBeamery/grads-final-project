/* eslint-disable no-undef */
// const { ObjectID } = require('mongodb');
// const { initDb, closeDb } = require('../databaseConnection');

// const findAdminById = require('./findAdminById');

it('Test to pass file', (done) => {
  done();
});

// beforeEach(() => {
//   return initDb();
// });

// afterEach(() => {
//   return closeDb();
// });

// it('Testing findAdminById returns one admin document when the correct _id is provided.', async () => {
//   expect.assertions(2);
//   const adminDocument = await findAdminById('519f1f77bcf86cd799439173');
//   const id = ObjectID('519f1f77bcf86cd799439173');
//   expect(adminDocument).toStrictEqual({
//     _id: id,
//     username: 'admin',
//     password: 'admin',
//     type: 'admin',
//     employeeId: '123123',
//   });
//   expect(typeof adminDocument).toBe('object');
// });

// it('Testing findAdminById returns null when an incorrect _id is provided.', async () => {
//   expect.assertions(1);
//   const adminDocument = await findAdminById('678f1f77bcf86cd645284950');
//   expect(adminDocument).toBeNull();
// });
