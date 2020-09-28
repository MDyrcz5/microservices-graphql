import ListingsService from "#root/adapters/ListingsService";

const listingsResolver = async (obj, { user_id }, context) => {
  if (!context.res.locals.userSession) throw new Error("Not logged in!");
  return await ListingsService.fetchAllListings(user_id);
};

export default listingsResolver;
