import { Request, Response } from 'express';
import { injectable } from 'inversify';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { prisma } from '@/infrastructure/persistence/PrismaClient';

const jwtSecret = process.env.JWT_SECRET as string;
const jwtExpiration = Number(process.env.JWT_EXPIRATION ?? 3600);

@injectable()
export class SignUpController {
  async invoke(req: Request, res: Response): Promise<void> {
    try {
      const {
        firstName,
        lastName,
        userName,
        password,
      } = req.body;

      // Buscar el usuario en la base de datos por email
      let user = await prisma.user.findFirst({
        where: {
          userName: {
            equals: userName,
          },
        },
      });

      if (user) {
        res.status(400).json({ error: 'Ya existe un usario con ese nombre' });
        return;
      }

      // Comparar la contraseña ingresada con la contraseña almacenada en la base de datos
      user = await prisma.user.create({
        data: {
          firstName,
          lastName,
          userName,
          password: await bcrypt.hash(password, 10),
        },
      });

      // Generar un token de JWT con el id del usuario
      const token = jwt.sign({ id: user.id }, jwtSecret, { expiresIn: jwtExpiration });

      // Enviar la respuesta con el token de JWT
      res.status(201).json({ token });
    } catch (error) {
      res.status(400).json({ error: 'Error de registro' });
    }
  }
}
