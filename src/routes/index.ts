import express from 'express';
import { homeApi } from '../controllers/default.controller.js';
import moviesRoute from './movies.route.js';

const router = express.Router();

router.use('/movies', moviesRoute);

router.get('/', homeApi);

export default router;
