import { Request, Response } from 'express';

export const getSample = (req: Request, res: Response) => {
  res.send('Sample Response');
};
