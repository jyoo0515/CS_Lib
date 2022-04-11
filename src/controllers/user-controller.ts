import User from '../entity/User';
import AppDataSource from '../data-source';
import { Request, Response } from 'express';

const usersRepository = AppDataSource.getRepository(User);

export const getAll = async (req: Request, res: Response) => {
  try {
    const users = await usersRepository.find();
    return res.json(users);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};
