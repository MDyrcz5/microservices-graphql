import {
    Listing
} from "#root/db/models";

const setupRoutes = app => {
    app.post("/user-listings", async (req, res, next) => {
        try {
            const listings = await Listing.findAll({
                where: {
                    user_id: req.body.user_id
                }
            });
            return res.json(listings);
        } catch (e) {
            return next(e);
        }
    });


    app.post("/listings", async (req, res, next) => {
        const { user_id, listings } = req.body;

        if (!user_id || !listings) {
            return next(new Error("Invalid body!"));
        }

        try {
            await listings.forEach(async element => {
                try {
                    await Listing.create({ user_id, title: element.title, _id: element._id });

                }
                catch (e) {
                    console.log(e)
                }
            });
            return res.json(listings);
        } catch (e) {
            return next(e);
        }
    });

    app.post("/user-listings/delete", async (req, res, next) => {
        const { user_id, listing_id } = req.body;

        if (!user_id || !listing_id) {
            return next(new Error("Invalid body!"));
        }

        try {
            try {
                await Listing.destroy({ where: [{ user_id: user_id }, { id: listing_id }] });
            }
            catch (e) {
                console.log(e)
            }
            return res.json(listing_id);
        } catch (e) {
            return next(e);
        }
    });

};

export default setupRoutes;