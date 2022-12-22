import { Request, Response } from 'express';
import userService from '../Services/userService';

const getAll = async (req: Request, res: Response) => {
  try {
    const response = await userService.getAll();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: error });
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
    return res.status(201).json(response);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const { id } = req.params;
    const checkId = await userService.getById(Number(id));
    if (!checkId) return res.status(404).json({ message: 'Id Not Found' });
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
};
