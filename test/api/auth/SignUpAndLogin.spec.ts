import { expect } from 'chai';
import request from 'supertest';
import app from '@test/app';

const userName = 'test';
const password = 'testpassword';

export const loginResponse = async () => request(app)
  .post('/api/auth/login')
  .send({ userName, password });

export const loginToken = async (): Promise<string> => {
  const body = (await loginResponse()).body as { token: string };
  return body.token;
};

export const signUpResponse = async () => request(app)
  .post('/api/auth/sign-up')
  .send({
    firstName: 'Test',
    lastName: 'Test',
    userName,
    password,
  });

export const signUpToken = async (): Promise<string> => {
  await signUpResponse();
  const res = await loginResponse();
  const body = res.body as { token: string };
  return body.token;
};

describe('create_test_user_api', () => {
  it('Should create test user', async () => {
    const res = await signUpResponse();

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('token');
  });
});

describe('login_api_with_test_user', () => {
  before(async () => {
    await signUpResponse();
  });

  it('should get a token', async () => {
    const res = await loginResponse();

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('token');
  });
});
