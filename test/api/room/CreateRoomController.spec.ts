import { expect } from 'chai';
import request from 'supertest';
import app from '@test/app';
import { signUpToken } from '@test/api/auth/SignUpAndLogin.spec';
import { Room } from '@prisma/client';
import moment from 'moment-timezone';

export const createRoomResponse = async (token: string) => request(app)
  .post('/api/room')
  .set('Authorization', `Bearer ${token}`)
  .send({ name: `Room ${moment().tz('Europe/Madrid').format('YYYYMMDDHHmmssSSS')}` });

export const createRoom = async (token: string): Promise<Room> => (
  (await createRoomResponse(token)).body as Room
);

describe('create_room', () => {
  let token: string;

  beforeEach(async () => {
    token = await signUpToken();
  });

  it('should create a new room', async () => {
    const res = await createRoomResponse(token);

    expect(res.status).to.equal(201);
  });
});
