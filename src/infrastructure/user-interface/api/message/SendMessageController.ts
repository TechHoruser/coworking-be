import { Request, Response } from 'express';
import { injectable } from 'inversify';
import { prisma } from '@/infrastructure/persistence/PrismaClient';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { FOREING_KEY_CODE } from '@/infrastructure/persistence/PrismaConstants';

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

    const prismaMessage = prisma.message.create({
      data: {
        content,
        userId,
        roomId,
      },
    });

    prismaMessage
      .then((message) => {
        res.status(201).send({ uuid: message.id });
      })
      .catch((error: PrismaClientKnownRequestError) => {
        if (error.code === FOREING_KEY_CODE) {
          res.status(404).send();
        }
        res.status(500).send();
      });
  }
}
