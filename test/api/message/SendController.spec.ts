import { expect } from 'chai';
import request from 'supertest';
import { userName, password } from '@test/api/auth/SignUpAndLogin.spec';
import app from '@test/app';

describe('message_send', () => {
  let token: string;

  before(async () => {
    // Login as a test user and get the JWT token
    const res = await request(app)
      .post('/api/auth/login')
      .send({ userName, password });

    token = res.body.token;
  });

  it('should send a message', async () => {
    const res = await request(app)
      .post('/api/message/send')
      .set('Authorization', `Bearer ${token}`)
      .send({ recipient: 'testuser2', message: 'Hello, world!' });

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('message', 'Message sent successfully');
  });
});
