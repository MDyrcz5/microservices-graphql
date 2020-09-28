import MoviesService from "#root/adapters/MoviesService";

const singleMovieResolver = async (obj, { movie_id }) => {
    return await MoviesService.fetchOneMovie(movie_id);
};

export default singleMovieResolver;
