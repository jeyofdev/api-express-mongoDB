import mongoose from 'mongoose';

const { model, Schema } = mongoose;

const movieSchema = new Schema({
  title: String,
  director: String,
  year: Number,
  rating: Number,
  duration: Number,
  type: String,
});

const MovieModel = model('movie', movieSchema);

export default MovieModel;
