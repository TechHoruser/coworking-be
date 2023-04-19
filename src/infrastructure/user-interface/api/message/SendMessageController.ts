import { Request, Response } from 'express';
import * as passport from 'passport';
import { injectable } from 'inversify';
import { prisma } from '@/infrastructure/persistence/PrismaClient';

@injectable()
export class SendMessageController {
  async invoke(req: Request, res: Response) {
    const {
      content,
      roomId,
    } = req.body as {
      content: string,
      roomId: string,
    };

    const userId = req.user as string;

    const message = await prisma.message.create({
      data: {
        content,
        userId,
        roomId,
      },
    });

    res.status(201).send(message);
  }
}
