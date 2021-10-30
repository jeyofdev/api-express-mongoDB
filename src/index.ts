import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import routes from './routes/index.js';

dotenv.config();

// Config
const PORT: Number = Number(process.env.PORT) || 4000;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', routes);

// Connect MongoDb
const connectOptions = { autoIndex: true };
mongoose
  .connect(<string>process.env.MONGO_URL, connectOptions)
  .then(() => console.log('Connected to database MongoDB'))
  .catch((err) => console.log(err));

// Routes
app.get('/', (_: Request, res: Response) => {
  res.status(200).json({ message: 'Welcome to the API' });
});

// Route 404
app.use((_: Request, res: Response) => {
  res.status(404).send({ error: 'Route not found' });
});

// Listen
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); // eslint-disable-line no-console
});
