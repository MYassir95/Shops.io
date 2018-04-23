// We import our shop schema
import Shop from '../models/shop';

// Get all the shops sorted by postDate
const getShops = (req, res) => {    
    // Query the db, if no errors send all the shops to the client
    let coords = [req.query.lng,req.query.lat];
    let maxDist = req.query.maxDist;
    Shop.find({location: {
                    $nearSphere: coords,
                    $maxDistance: maxDist/6371
                    }                
                }, null, { sort: { name : 1 } }, (err, shops) => {
        if (err) {
            res.send(err);
        }
        res.json(shops); // Shops sent as json
    });
}

// Get a single shop filtered by ID
const getShop = (req, res) => {
    const { id } = req.params;
    // Query the db for a single shop, if no errors send it to the client
    Shop.findById(id, (err, shop) => {
        if (err) {
            res.send(err);
        }
        res.json(shop); // Shop sent as json
    });
}

// We export our functions to be used in the server routes
export { getShops, getShop };
