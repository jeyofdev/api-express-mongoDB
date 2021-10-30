import { RouteCallbackType, MovieType } from '../@types/types/index.js';
import MovieModel from '../models/movie.model.js';

/**
 * Post movie
 */
export const saveMovies: RouteCallbackType = async (req, res) => {
  await MovieModel.init();

  try {
    const newMovie = new MovieModel(req.body);
    const result: MovieType = await newMovie.save();

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
export const findAllMovies: RouteCallbackType = async (req, res) => {
  await MovieModel.init();

  try {
    const movies: MovieType[] = await MovieModel.find();

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
export const findMovieById: RouteCallbackType = async (req, res) => {
  await MovieModel.init();

  try {
    const { id } = req.params;
    const movie: MovieType | null = await MovieModel.findOne({ _id: id });

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
export const updateMovieById: RouteCallbackType = async (req, res) => {
  await MovieModel.init();

  try {
    const { id } = req.params;
    const movie: MovieType | null = await MovieModel.findOne(
      { _id: id },
      req.body
    );

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
 * Delete movie by Id
 */
export const deleteMovieById: RouteCallbackType = async (req, res) => {
  await MovieModel.init();

  try {
    const { id } = req.params;
    const movie: MovieType | null = await MovieModel.findByIdAndDelete(id);

    if (!movie) {
      return res.status(200).json({ message: 'No movie found !!!' });
    }

    return res
      .status(200)
      .json({ message: 'Movie deleting successfully', result: movie });
  } catch (err) {
    return res.status(400).json({
      error: (err as Error).message,
    });
  }
};
