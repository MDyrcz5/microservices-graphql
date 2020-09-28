import got from 'got';

import accessEnv from '#root/helpers/accessEnv';

const MOVIES_SERVICE_URI = 'http://movies-service:7102';

export default class MoviesService {
    static async fetchAllMovies(page_number) {
        const body = await got.post(`${MOVIES_SERVICE_URI}/movies`, {
            json: {
                page_number
            }
        }).json();

        return body;
    }

    static async fetchOneMovie(movie_id) {
        const body = await got.post(`${MOVIES_SERVICE_URI}/single-movie`, {
            json: {
                movie_id
            }
        }).json();

        return body;
    }
}
