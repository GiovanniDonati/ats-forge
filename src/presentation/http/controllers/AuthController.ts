import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { PrismaUserRepository } from '../../../infrastructure/repositories/PrismaUserRepository';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key';
const userRepository = new PrismaUserRepository();

export const AuthController = {
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await userRepository.findByEmail(email);

      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const passwordHash = await userRepository.getPasswordHashByUserId(user.id!);
      
      const isPasswordValid = await bcrypt.compare(password, passwordHash || '');

      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
        expiresIn: '1h',
      });

      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  },
};
