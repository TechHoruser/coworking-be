import { expect } from 'chai';
import request from 'supertest';
import { Room } from '@prisma/client';
import app from '@test/app';
import { signUpToken } from '@test/api/auth/SignUpAndLogin.spec';
import { createRoom } from '@test/api/room/CreateRoomController.spec';

describe('message_send', () => {
  let token: string;
  let roomId: string;

  before(async () => {
    token = await signUpToken();
    const room: Room = await createRoom(token);
    roomId = room.id;
  });

  it('should send a message', async () => {
    const res = await request(app)
      .post('/api/message/send')
      .set('Authorization', `Bearer ${token}`)
      .send({
        content: 'Test message',
        roomId,
      });

    expect(res.status).to.equal(201);
  });
});

describe('send_message_and_fail', () => {
  let token: string;

  before(async () => {
    token = await signUpToken();
  });

  it('should fail to send a message', async () => {
    const res = await request(app)
      .post('/api/message/send')
      .set('Authorization', `Bearer ${token}`)
      .send({
        content: 'Test message',
        roomId: 'invalid',
      });

    expect(res.status).to.equal(400);
  });
});
