import got from "got";

import accessEnv from '#root/helpers/accessEnv';

const LISTINGS_SERVICE_URI = "http://listings-service:7100";

export default class ListingsService {
  static async createListing(user_id, listings) {
    await got.post(`${LISTINGS_SERVICE_URI}/listings`, {
      json: {
        user_id, listings
      }
    });
    return true;
  }

  static async fetchAllListings(user_id) {
    const body = await got.post(`${LISTINGS_SERVICE_URI}/user-listings`, {
      json: {
        user_id
      }
    }).json();

    return body;
  }

  static async deleteListing(user_id, listing_id) {
    await got.post(`${LISTINGS_SERVICE_URI}/user-listings/delete`, {
      json: {
        user_id, listing_id
      }
    });

    return true;
  }
}