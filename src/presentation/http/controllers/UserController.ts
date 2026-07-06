import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { PrismaUserRepository } from '../../../infrastructure/repositories/PrismaUserRepository';
import { UserEntity } from '../../../domain/entities/User';
import { GetAllUsersUseCase } from '../../../application/use-cases/user/GetAllUsersUseCase';

const userRepository = new PrismaUserRepository();
const getAllUsersUseCase = new GetAllUsersUseCase(userRepository);
const SALT_ROUNDS = 10;

export const UserController = {
  async register(req: Request, res: Response) {
    try {
      const { username, email, firstName, lastName, displayName, password } = req.body;

      const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

      const user: UserEntity = {
        username,
        email,
        firstName,
        lastName,
        displayName: displayName || `${firstName} ${lastName}`,
      };

      const createdUser = await userRepository.create(user, passwordHash);
      res.status(201).json(createdUser);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const user = await userRepository.findById(req.params.id as string);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  },

  async getAll(req: Request, res: Response) {
    try {
      const users = await getAllUsersUseCase.execute();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  },
};
