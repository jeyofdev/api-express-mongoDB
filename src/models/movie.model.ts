import { model, Schema } from 'mongoose';

const movieSchema = new Schema({
  title: String,
  director: String,
  year: Number,
  rating: Number,
  duration: Number,
  type: String,
});

const MovieSchema = model('movie', movieSchema);

export default MovieSchema;
