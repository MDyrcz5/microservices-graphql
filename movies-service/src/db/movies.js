import mongoose from 'mongoose';

const MovieSchema = mongoose.Schema(
  {
    _id: String,
    title: String,
    plot: String,
    genres: [String],
    runtime: Number,
    cast: [String],
    fullplot: String,
    countries: [String],
    released: Date,
    directors: [String],
    rated: String,
    awards: [String],
    type: String,
    tomatoes: {
      viewer: {
        rating: Number,
        text: String,
        nomination: Number
      },
      lastUpdated: Date
    },
    year: Number,
    imdb: {
      rating: Number,
      votes: Number,
      id: Number,
    }
  }



  , { collection: 'movies' });

export default mongoose.model('Movie', MovieSchema);
