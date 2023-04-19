import { JwtPayload } from '@/infrastructure/auth/JwtPayloadInterface';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

export const JwtDecodeMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    // Obtiene el token JWT del encabezado de autorización
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];
    if (!token) {
      throw new Error('Invalid token');
    }

    // Verifica el token JWT y extrae su contenido
    const jwtSecret = process.env.JWT_SECRET as string;
    const decodedToken = jwt.verify(token, jwtSecret) as JwtPayload;

    req.user = decodedToken.id;

    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};
