import express from 'express';
import saveMovies from '../controllers/movies.controller.js';

const router = express.Router();

router.post('/', saveMovies);

export default router;
