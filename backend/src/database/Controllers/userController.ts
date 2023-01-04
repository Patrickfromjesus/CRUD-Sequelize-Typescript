import { Request, Response } from 'express';
import 'dotenv/config';
import UserService from '../Services/userService';
import jwt from 'jsonwebtoken';

const userService = new UserService();

type Payload = {
  id: number;
};

const SECRET = process.env.JWT_SECRET || 'secret';

const makeToken = (payload: Payload) => {
  const token = jwt.sign(payload, SECRET, { expiresIn: '5h' });
  return token
}

const getAll = async (req: Request, res: Response) => {
  try {
    const response = await userService.getAll();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const getByEmail = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const response = await userService.getByEmail(email, password);
    if (!response) return res.status(404).json({ message: 'User Not Found' });
    const token = makeToken({ id: response.id });
    return res.status(200).json({ token, id: response.id });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const getById = async (req: Request, res: Response) => {
 try {
  const { id } = req.params;
  const response = await userService.getById(Number(id));
  if (!response) return res.status(404).json({ message: 'Id Not Found' });
  return res.status(200).json(response);
 } catch (error) {
  return res.status(500).json({ message: error });
 }
};

const create = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const response = await userService.create({ name, email, password });
    const token = makeToken({ id: response.id });
    return res.status(201).json({ token, id: response.id });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const { id } = req.params;
    const response = await userService.update({ name, email, password }, Number(id));
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await userService.destroy(Number(id));
    return res.status(204).end();
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}

export default {
  getAll,
  getById,
  create,
  update,
  destroy,
  getByEmail,
};
