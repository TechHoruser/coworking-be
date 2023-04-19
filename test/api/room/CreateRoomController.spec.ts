import { expect } from 'chai';
import request from 'supertest';
import app from '@test/app';
import { signUpToken } from '@test/api/auth/SignUpAndLogin.spec';
import { Room } from '@prisma/client';

export const createRoomResponse = async (token: string) => request(app)
  .post('/api/room')
  .set('Authorization', `Bearer ${token}`)
  .send({ name: 'Room' });

export const createRoom = async (token: string): Promise<Room> => (
  (await createRoomResponse(token)).body as Room
);

describe('create_room', () => {
  let token: string;

  before(async () => {
    token = await signUpToken();
  });

  it('should send a new room', async () => {
    const res = await createRoomResponse(token);

    expect(res.status).to.equal(201);
  });
});
