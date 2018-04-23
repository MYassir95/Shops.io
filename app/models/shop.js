// Dependencies
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

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
        }
    }
);

shopSchema.index({location: '2dsphere'});

// We export the schema to use it anywhere else
export default mongoose.model('Shop', shopSchema);