import User from '../entity/user.entity';
import { Request, Response } from 'express';

export const getAll = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    return res.json(users);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

export const checkUnique = async (req: Request, res: Response) => {
  const username = req.params.username;
  try {
    await User.findOneOrFail({ where: { username: username } });
    return res.json(false);
  } catch (err) {
    return res.json(true);
  }
};
