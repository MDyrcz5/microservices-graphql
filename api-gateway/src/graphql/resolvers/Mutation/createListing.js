import ListingsService from "#root/adapters/ListingsService";

const createListingResolver = async (obj, { user_id, listings }, context) => {
    if (!context.res.locals.userSession) throw new Error("Not logged in!");
    await ListingsService.createListing(user_id, listings);
    return true;
};

export default createListingResolver;