import Movie from '../db/movies';

const setupRoutes = (app) => {
  app.get('/movies', async (req, res, next) => {
    try {
      const movies = await Movie.find({}).limit(100);
      return res.json(movies);
    } catch (e) {
      return next(e);
    }
  });


  app.post("/movies", async (req, res, next) => {
    const { page_number } = req.body;
    const page = parseInt(page_number);


    const movies = await Movie.find({});

    const allMovies = movies.slice(
      movies.length - (page + 1) * 100,
      movies.length - page * 100
    );

    if (allMovies) {
      res.json(allMovies);
    } else {
      res
        .status(400)
        .json({ error: `No items with the specified parameters` });
    }
  });

  app.post("/single-movie", async (req, res, next) => {
    const { movie_id } = req.body;
    try {
      const movie = await Movie.findById({ _id: movie_id });
      return res.json(movie);
    } catch (e) {
      return next(e);
    }
  });
}

export default setupRoutes;