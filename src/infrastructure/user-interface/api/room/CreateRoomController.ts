import { Request, Response } from 'express';
import { injectable } from 'inversify';
import { prisma } from '@/infrastructure/persistence/PrismaClient';

@injectable()
export class CreateRoomController {
  async invoke(req: Request, res: Response): Promise<void> {
    const {
      name,
    } = req.body as {
      name: string,
    };

    const room = await prisma.room.create({
      data: {
        name,
      },
    });

    res.status(201).json(room);
  }
}
