import MoviesService from "#root/adapters/MoviesService";

const moviesResolver = async (obj, { page_number }) => {
    return await MoviesService.fetchAllMovies(page_number);
};

export default moviesResolver;
