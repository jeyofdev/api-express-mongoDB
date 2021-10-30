import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

// Config
const PORT: Number = Number(process.env.PORT) || 4000;
const app = express();

// Connect MongoDb
const connectOptions = { autoIndex: true };
mongoose
  .connect(<string>process.env.MONGO_URL, connectOptions)
  .then(() => console.log('Connected to database MongoDB'))
  .catch((err) => console.log(err));

// Routes
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the API' });
});

// Listen
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
