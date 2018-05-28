// We import our shop schema
import Shop from '../models/shop';
import Dislike from '../models/dislike';
import Like from '../models/like';

// Get nearby shops sorted by distance
const getNearbyShops = (req, res) => {    
    // Query the db, if no errors send all the shops to the client
    let coords = [req.query.lng,req.query.lat];
    // We convert the value of maxDist in kilometers to radians by dividing it by the radius of the earth (6371 km)
    let maxDist = req.query.maxDist/6371;
    let userId = req.query.userId;
    // The $nearSphere operator sorts the results by distance
    Shop.find({location: {
                    $nearSphere: coords,
                    $maxDistance: maxDist
                    }          
                })
        .populate('likes dislikes')
        .exec(function(err,shops) {
            shops = shops.filter(shop => shop.likes.every(like => like.userId!=userId))
                         .filter(shop => shop.dislikes.every(dislike => dislike.userId!=userId));
            res.json(shops);
        });
}

// Get all the shops the user has liked
const getPreferredShops = (req, res) => {    
    // Query the db, if no errors send all the shops to the client
    let userId = req.query.userId;
    Shop.find()
        .populate('likes')
        .exec(function(err,shops) {
            shops = shops.filter(shop => shop.likes.some(like => like.userId==userId));
            res.json(shops);
        });
}

// Handles the action of liking a shop
const likeShop = (req, res) => {
    let shopId = req.body.shopId;
    let userId = req.body.userId;
    Like.findOne({ userId: userId, shopId: shopId }, (err, alreadyLiked) => {
        // We create a new like object to be stored in the likes collection
        let like = new Like({
            userId: req.body.userId,
            shopId: req.body.shopId
        });
        like.save((err, result) => {
          if (err) {
            res.send(err);
          }
          // if the like object is stored succesfully we add its _id field to the likes field of the shops database
          Shop.findByIdAndUpdate(shopId, {$addToSet: {likes: result._id}}, (err, shop) => {
              if(err) {
                  res.send(err);
              };
            res.json(shop);
          })
        });
    });
}

const dislikeShop = (req, res) => {
    let shopId = req.body.shopId;
    let userId = req.body.userId;
    Dislike.findOne({ userId: userId, shopId: shopId }, (err, alreadyDisliked) => {
        // We create a new dislike object to be stored in the likes collection
        let dislike = new Dislike({
            createdAt: new Date(),
            userId: req.body.userId,
            shopId: req.body.shopId
        });
        dislike.save((err, result) => {
          if (err) {
            res.send(err);
          }
          // if the dislike object is stored succesfully we add its _id field to the likes field of the shops database
          Shop.findByIdAndUpdate(shopId, {$addToSet: {dislikes: result._id}}, (err, shop) => {
              if(err) {
                  res.send(err);
              };
            res.json(shop);
          })
        });
    });
}

// Removes a shop in the preferred shops list
const removeShop = (req, res) => {
  let userId = req.body.userId;
  let shopId = req.body.shopId;
  // First we find the like object associated to the shop and the user
  Like.findOne({ userId: userId, shopId: shopId }, (err, like) => {
    if(err) {
        res.send(err);
    };
    // We then pull the like object's id from the shops likes field
    Shop.findByIdAndUpdate(shopId, {$pull: {likes: like._id}}, (err, shop) => {
        if(err) {
            res.send(err);
        };
      res.json(shop);
    });
    //Finally we remove the like object from the likes collection
    like.remove();
  });
}

// We export our functions to be used in the server routes
export { getNearbyShops, getPreferredShops, likeShop, dislikeShop, removeShop };
