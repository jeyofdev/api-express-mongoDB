import { Request, Response } from 'express';
import MovieModel from '../models/movie.model.js';

/**
 * Post movie
 */
const saveMovies = async (req: Request, res: Response) => {
  await MovieModel.init();

  try {
    const newMovie = new MovieModel(req.body);
    const result = await newMovie.save();

    res.status(201).json({
      result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      result: (error as Error).message,
    });
  }
};

export default saveMovies;
