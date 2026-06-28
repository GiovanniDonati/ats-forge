import { Request, Response, NextFunction } from 'express';

export const validateUserRegistration = (req: Request, res: Response, next: NextFunction) => {
  const { username, email, firstName, lastName, password } = req.body;

  if (!username || !email || !firstName || !lastName || !password) {
    return res.status(400).json({ error: 'Missing required user fields' });
  }

  if (!email.includes('@')) {
    return res.status(400).json({ error: 'Invalid email format' });
  }
  next();
};
