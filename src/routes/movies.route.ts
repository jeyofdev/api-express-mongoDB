import express from 'express';
import {
  saveMovies,
  findAllMovies,
  findMovieById,
  updateMovieById,
  deleteMovieById,
} from '../controllers/movies.controller.js';
import verifyToken from '../middlewares/index.js';

const router = express.Router();

router.post('/', verifyToken, saveMovies);
router.get('/', findAllMovies);
router.get('/:id', findMovieById);
router.put('/:id', verifyToken, updateMovieById);
router.delete('/:id', verifyToken, deleteMovieById);

export default router;
