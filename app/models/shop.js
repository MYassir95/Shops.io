// Dependencies
import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import User from '../models/user';
import Dislike from '../models/dislike';
import Llike from '../models/like';

// Our schema definition
const shopSchema = new Schema(
    {
        name: String,
        email: String,
        city: String,
        picture: String,
        location: {
            type: {type: String},
            coordinates: [Number],
        },
        likes: [{ type: Schema.Types.ObjectId, ref: 'Like' }],
        dislikes:[{type: Schema.Types.ObjectId, ref: 'Dislike'}]
    }
);

shopSchema.index({location: '2dsphere'});

// We export the schema to use it anywhere else
export default mongoose.model('Shop', shopSchema);