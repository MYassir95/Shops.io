// Dependencies
import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import Shop from '../models/shop';
import User from '../models/user';

// Our schema definition
const likeSchema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User' },
        shopId: { type: Schema.Types.ObjectId, ref: 'Shop' }
    }
);

export default mongoose.model('Like', likeSchema);