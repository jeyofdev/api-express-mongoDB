import { RouteCallbackType } from '../@types/types/index.js';

/**
 * Root
 */
export const root: RouteCallbackType = async (_, res) => {
  res.status(200).json({ message: 'Welcome to the API' });
};

/**
 * Home Api
 */
export const homeApi: RouteCallbackType = async (_, res) => {
  res.status(200).json({ message: 'API home' });
};

/**
 * Route not found
 */
export const notFound: RouteCallbackType = async (_, res) => {
  res.status(404).send({ error: 'Route not found' });
};
