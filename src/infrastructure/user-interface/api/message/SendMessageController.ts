import { Request, Response } from 'express';
import { injectable } from 'inversify';
import { prisma } from '@/infrastructure/persistence/PrismaClient';

@injectable()
export class SendMessageController {
  async invoke(req: Request, res: Response): Promise<void> {
    const {
      content,
      roomId,
    } = req.body;

    const message = await prisma.message.create({
      data: {
        content,
        userId: '',
        roomId,
      },
    });

    res.send(message);
  }
}
