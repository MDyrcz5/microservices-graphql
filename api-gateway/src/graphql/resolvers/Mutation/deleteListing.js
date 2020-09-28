
import ListingsService from "../../../adapters/ListingsService";

const deleteListing = async (obj, { user_id, listing_id }, context) => {
    if (!context.res.locals.userSession) throw new Error("Not logged in!");
    await ListingsService.deleteListing(user_id, listing_id);
    return true;
};

export default deleteListing;