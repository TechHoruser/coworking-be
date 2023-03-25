import { Request, Response } from 'express';
import { injectable } from 'inversify';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { prisma } from '@/infrastructure/persistence/PrismaClient';

const jwtSecret = process.env.JWT_SECRET as string;
const jwtExpiration = process.env.JWT_EXPIRATION as string;

@injectable()
export class SendMessageController {
  static async invoke(req: Request, res: Response): Promise<void> {
    try {
      const { userName, password } = req.body;

      // Buscar el usuario en la base de datos por email
      const user = await prisma.user.findFirst({
        where: {
          userName: {
            equals: userName,
          },
        },
      });

      // Si el usuario no existe, enviar error de autenticación
      if (!user) {
        res.status(401).json({ error: 'Email o contraseña incorrectos' });
        return;
      }

      // Comparar la contraseña ingresada con la contraseña almacenada en la base de datos
      const match = await bcrypt.compare(password, user.password);

      // Si las contraseñas no coinciden, enviar error de autenticación
      if (!match) {
        res.status(401).json({ error: 'Email o contraseña incorrectos' });
        return;
      }

      // Generar un token de JWT con el id del usuario
      const token = jwt.sign({ id: user.id }, jwtSecret, { expiresIn: jwtExpiration });

      // Enviar la respuesta con el token de JWT
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ error: 'Error al iniciar sesión' });
    }
  };
}
