// Dependencies
import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import Shop from '../models/shop';
import User from '../models/user';

// Our schema definition
const dislikeSchema = new Schema(
    {
        createdAt: Date,
        userId: { type: Schema.Types.ObjectId, ref: 'User' },
        shopId: { type: Schema.Types.ObjectId, ref: 'Shop' }
    }, {timestamps:true}
);

dislikeSchema.index({createdAt: 1}, {expireAfterSeconds: 7200});

export default mongoose.model('Dislike', dislikeSchema);