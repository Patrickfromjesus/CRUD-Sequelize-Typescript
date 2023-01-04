import { NextFunction, Request, Response } from 'express';
import UserService from '../Services/userService';

const userService = new UserService();

const validateLogin = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.email) {
    return res.status(400).json({ message: 'Invalid Email!' });
  }
  if (!req.body.password) {
    return res.status(400).json({ message: 'Invalid Password!' });
  }
  return next();
};

const validateRegister = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.name) {
    return res.status(400).json({ message: 'Name must be provided!' });
  }
  return next();
};

const validateId = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const data = await userService.getById(Number(id));
  if (!data) return res.status(404).json({ message: 'User Not Found.' });
  next();
};

export default {
  validateLogin,
  validateRegister,
  validateId,
};
