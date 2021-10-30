import express from 'express';
import {
  saveMovies,
  findAllMovies,
  findMovieById,
  updateMovieById,
  deleteMovieById,
} from '../controllers/movies.controller.js';

const router = express.Router();

router.post('/', saveMovies);
router.get('/', findAllMovies);
router.get('/:id', findMovieById);
router.put('/:id', updateMovieById);
router.delete('/:id', deleteMovieById);

export default router;
