import express from 'express';
import {
  saveMovies,
  findAllMovies,
  findMovieById,
} from '../controllers/movies.controller.js';

const router = express.Router();

router.post('/', saveMovies);
router.get('/', findAllMovies);
router.get('/:id', findMovieById);

export default router;
