import { Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import { prisma } from '@/infrastructure/persistence/PrismaClient';
import { UuidGenerator } from '@/domain/value-object/interface/UuidGenerator';
import { TYPES } from '@/infrastructure/domain-implementation/types';

@injectable()
export class SendMessageController {
  constructor(
    @inject(TYPES.UuidGenerator) private readonly uuidGenerator: UuidGenerator,
  ) {}

  async invoke(req: Request, res: Response): Promise<void> {
    const user = await prisma.user.create({
      data: {
        name: 'Fran',
      },
    });

    const room = await prisma.room.create({
      data: {
        name: 'Room',
      },
    });

    const message = await prisma.message.create({
      data: {
        content: 'message',
        userId: user.id,
        roomId: room.id,
      },
    });

    res.send(message);
  }
}
