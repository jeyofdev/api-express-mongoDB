import express from 'express';
import { homeApi } from '../controllers/default.controller.js';
import moviesRoute from './movies.route.js';
import authRoute from './auth.route.js';

const router = express.Router();

router.use('/movies', moviesRoute);
router.use('/auth', authRoute);

router.get('/', homeApi);

export default router;
