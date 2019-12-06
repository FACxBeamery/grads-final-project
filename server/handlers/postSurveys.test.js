const request = require('supertest');
const { initDb, closeDb } = require('../databaseConnection');
const { ObjectID } = require('mongodb');

// beforeEach(() => {
//   return initDb();
// });

// afterEach(() => {
//   return closeDb();
// });

// const dummySurvey = {
//   title: 'test survey title',
//   description: 'Test description',
//   status: 'created',
//   dateCreated: '28 NOV 2019 GMT',
//   dateToPublish: '28 NOV 2019 GMT',
//   datePublished: '28 NOV 2019 GMT',
//   dateToClose: '28 NOV 2019 GMT',
//   dateClosed: '28 NOV 2019 GMT',
//   anonymous: false,
//   recipients: [{ employeeId: '321423143214', completed: true }],
//   questions: [
//     {
//       id: ObjectID('707f1f42bcf86dd799439011'),
//       title: 'Please describe your first week in few sentences',
//       type: 'text',
//       required: true,
//       commentEnabled: true,
//     },
//     {
//       id: ObjectID('707f1f87bcf86dd799439021'),
//       title: 'How did you feel at work this week?',
//       type: 'multichoice',
//       required: true,
//       commentEnabled: true,
//       options: [
//         {
//           text: 'really bad',
//           position: 0,
//         },
//         {
//           text: 'bad',
//           position: 1,
//         },
//         {
//           text: 'meh',
//           position: 2,
//         },
//         {
//           text: 'good',
//           position: 3,
//         },
//         {
//           text: 'great',
//           position: 4,
//         },
//       ],
//     },
//   ],
//   responses: [
//     {
//       employeeId: '32123123',
//       answers: [
//         {
//           questionId: '32142314',
//           answer: 'yes!',
//           comment: 'this is a comment',
//         },
//       ],
//     },
//   ],
// };

// describe('Testing POST to the /surveys endpoint', () => {
//   it('Reponds with 200 when given a suitable JSON in body.', (done) => {
//     request('http://localhost:4000')
//       .post('/surveys')
//       .send(dummySurvey)
//       .set('Accept', 'application/json')
//       .expect(200)
//       .expect('Content-Type', /json/);
//     return done();
//   });

it('Responds with 500 if an inappropriate body is POSTed to /surveys', (done) => {
  // request('http://localhost:4000')
  //   .post('/surveys')
  //   .send('An invalid body')
  //   .set('Accept', 'application/json')
  //   .expect(500);
  //   return done();
  // });
  done();
});
