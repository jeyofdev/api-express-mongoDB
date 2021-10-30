import { Request, Response } from 'express';
import MovieModel from '../models/movie.model.js';

/**
 * Post movie
 */
export const saveMovies = async (req: Request, res: Response) => {
  await MovieModel.init();

  try {
    const newMovie = new MovieModel(req.body);
    const result = await newMovie.save();

    res.status(201).json({
      result,
    });
  } catch (err) {
    res.status(400).json({
      error: (err as Error).message,
    });
  }
};

/**
 * Get All movies
 */
export const findAllMovies = async (req: Request, res: Response) => {
  await MovieModel.init();

  try {
    const movies = await MovieModel.find();

    if (movies.length < 1) {
      return res.status(200).json({ message: 'No movie found !!!' });
    }

    return res.status(200).json({ result: movies });
  } catch (err) {
    return res.status(400).json({
      error: (err as Error).message,
    });
  }
};

/**
 * Get movie by Id
 */
export const findMovieById = async (req: Request, res: Response) => {
  await MovieModel.init();

  try {
    const { id } = req.params;
    const movie = await MovieModel.findOne({ _id: id });

    if (!movie) {
      return res.status(200).json({ message: 'No movie found !!!' });
    }

    return res.status(200).json({ result: movie });
  } catch (err) {
    return res.status(400).json({
      error: (err as Error).message,
    });
  }
};

/**
 * Update movie by Id
 */
export const updateMovieById = async (req: Request, res: Response) => {
  await MovieModel.init();

  try {
    const { id } = req.params;
    const movie = await MovieModel.findOneAndUpdate({ _id: id }, req.body);

    if (!movie) {
      return res.status(200).json({ message: 'No movie found !!!' });
    }

    return res.status(200).json({ result: movie });
  } catch (err) {
    return res.status(400).json({
      error: (err as Error).message,
    });
  }
};
