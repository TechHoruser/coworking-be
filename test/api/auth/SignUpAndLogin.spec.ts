import { expect } from 'chai';
import request from 'supertest';
import app from '@test/app';

export const userName = 'test';
export const password = 'testpassword';

describe('create_test_user_api', () => {
  it('Should creat test user', async () => {
    const res = await request(app)
      .post('/api/auth/sign-up')
      .send({
        firstName: 'Test',
        lastName: 'Test',
        userName,
        password,
      });

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('token');
  });
});

describe('login_api_with_test_user', () => {
  it('should get a token', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ userName, password });

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('token');
  });
});
