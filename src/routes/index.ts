import express, { Request, Response } from 'express';
import moviesRoute from './movies.route.js';

const router = express.Router();

router.use('/movies', moviesRoute);

router.get('/', (_: Request, res: Response) => {
  res.status(200).json({ message: 'API home' });
});

export default router;