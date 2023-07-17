import mongoose from "mongoose";

const PlayerSchema = mongoose.Schema({
    first: String, last: String,
    age: Number, info: String,
    image: String, cloudinary_id: String
});

export const PlayerModel = 
    mongoose.model("Player", PlayerSchema);


