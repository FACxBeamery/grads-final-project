/* eslint-disable no-undef */
const request = require('supertest');
const { initDb, closeDb } = require('../databaseConnection');
const app = require('../app');

describe('Test authentication using JWT tokens', () => {
  it('sends an error status if no auth token sent', async () => {
    await initDb();

    const res = await request(app).get('/admins');
    expect(res.status).toEqual(401);

    return closeDb();
  });

  it('sends response data if auth token sent', async () => {
    await initDb();

    const loginResponse = await request(app)
      .post('/login')
      .send({
        username: 'admin',
        password: 'admin',
      });

    expect(loginResponse.status).toEqual(200);
    expect(loginResponse.body.auth).toEqual(true);
    expect(loginResponse.body.token).toBeDefined();

    const {
      body: { token },
    } = loginResponse;

    const res = await request(app)
      .get('/admins')
      .set('Authorization', `JWT ${token}`);

    expect(res.status).toEqual(200);
    expect(JSON.parse(res.text)).toStrictEqual({
      message: 'Protected route accessed!',
    });

    return closeDb();
  });

  it('Responds with message and status 401 when no JWT provided.', async () => {
    const res = await request(app)
      .get('/admins')
      .set('Accept', 'application/json');

    expect(res.status).toEqual(401);
    expect(JSON.parse(res.text)).toStrictEqual({ message: 'No auth token' });
  });

  it('Empty JWT token', async () => {
    const res = await request(app)
      .get('/admins')
      .set('Authorization', `JWT `);

    expect(res.status).toEqual(401);
    expect(JSON.parse(res.text)).toStrictEqual({ message: 'No auth token' });
  });
});
