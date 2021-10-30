import { RouteCallbackType, MovieType } from '../@types/types/index.js';
import MovieModel from '../models/movie.model.js';
import movieValidation from '../utils/validation.js';

/**
 * Post movie
 */
export const saveMovies: RouteCallbackType = async (req, res) => {
  const { title } = req.body;

  await MovieModel.init();

  let validationErrors: string | object | null | undefined = null;

  return MovieModel.findOne({
    title,
  })
    .then(async (movieExist) => {
      if (movieExist) {
        return Promise.reject('DUPLICATE_MOVIE'); // eslint-disable-line prefer-promise-reject-errors
      }

      validationErrors = movieValidation(req.body);
      if (validationErrors) {
        return Promise.reject('INVALID_DATA'); // eslint-disable-line prefer-promise-reject-errors
      }

      const newMovie = new MovieModel(req.body);
      return newMovie
        .save()
        .then((movie: MovieType) =>
          res.status(201).json({
            result: movie,
          })
        )
        .catch((err: object) => {
          res.status(500).send({ error: 'Error saving the movie', err });
        });
    })
    .catch((err: string | object) => {
      if (err === 'DUPLICATE_MOVIE') {
        res
          .status(409)
          .json({ message: 'This movie is already in the database' });
      } else if (err === 'INVALID_DATA') {
        res.status(422).json({ validationErrors });
      } else {
        res.status(500).send({ error: 'Error saving the movie', err });
      }
    });
};

/**
 * Get All movies
 */
export const findAllMovies: RouteCallbackType = async (req, res) => {
  await MovieModel.init();

  return MovieModel.find(req.query)
    .then((movies) => {
      if (movies.length < 1) {
        return Promise.reject('NO_MOVIE_FOUND'); // eslint-disable-line prefer-promise-reject-errors
      }
      return res.status(200).json({ result: movies });
    })
    .catch((err: string | object) => {
      if (err === 'NO_MOVIE_FOUND') {
        res.status(200).json({ message: 'No movies found !!!' });
      } else {
        res
          .status(500)
          .json({ error: 'Error retrieving data from database', err });
      }
    });
};

/**
 * Get movie by Id
 */
export const findMovieById: RouteCallbackType = async (req, res) => {
  const { id } = req.params;

  await MovieModel.init();

  return MovieModel.findOne({ _id: id })
    .then((movie) => {
      if (!movie) {
        return Promise.reject('NO_MOVIE_FOUND'); // eslint-disable-line prefer-promise-reject-errors
      }

      return res.status(200).json({ result: movie });
    })
    .catch((err) => {
      if (err === 'NO_MOVIE_FOUND') {
        res.status(200).json({ message: 'No movies found !!!' });
      } else {
        res
          .status(500)
          .json({ error: 'Error retrieving data from database', err });
      }
    });
};

/**
 * Update movie by Id
 */
export const updateMovieById: RouteCallbackType = async (req, res) => {
  const { id } = req.params;

  await MovieModel.init();

  let validationErrors: string | object | null | undefined = null;

  return MovieModel.findOne({ _id: id }, req.body)
    .then((movie) => {
      if (!movie) {
        return Promise.reject('NO_MOVIE_FOUND'); // eslint-disable-line prefer-promise-reject-errors
      }

      validationErrors = movieValidation(req.body, false);
      if (validationErrors) {
        return Promise.reject('INVALID_DATA'); // eslint-disable-line prefer-promise-reject-errors
      }

      return MovieModel.findOne({ _id: id }, req.body).then(() => {
        res
          .status(200)
          .json({ message: 'movie updated successfull', result: movie });
      });
    })
    .catch((err) => {
      if (err === 'NO_MOVIE_FOUND') {
        res.status(409).json({ message: 'Movie not found' });
      } else if (err === 'DUPLICATE_MOVIE') {
        res
          .status(409)
          .json({ message: 'This movie is already in the database' });
      } else if (err === 'INVALID_DATA') {
        res.status(422).json({ validationErrors });
      } else {
        res.status(500).send({ error: 'Error update the movie', err });
      }
    });
};

/**
 * Delete movie by Id
 */
export const deleteMovieById: RouteCallbackType = async (req, res) => {
  const { id } = req.params;

  await MovieModel.init();

  return MovieModel.findByIdAndDelete(id)
    .then((movie) => {
      if (!movie) {
        return Promise.reject('NO_MOVIE_FOUND'); // eslint-disable-line prefer-promise-reject-errors
      }

      return res.status(200).json({
        message: 'Movie deleting successfully',
        movieDeleted: movie,
      });
    })
    .catch((err) => {
      if (err === 'NO_MOVIE_FOUND') {
        res.status(200).send({ message: 'Movie not found' });
      } else {
        res.status(500).send({ error: 'Error deleting a movie' });
      }
    });
};
