import express from 'express';
import {
  saveMovies,
  findAllMovies,
  findMovieById,
  updateMovieById,
} from '../controllers/movies.controller.js';

const router = express.Router();

router.post('/', saveMovies);
router.get('/', findAllMovies);
router.get('/:id', findMovieById);
router.put('/:id', updateMovieById);

export default router;
