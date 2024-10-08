import mongoose from "mongoose";

//To Define Structer of data we use Schema
const UserSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    saveRecipes: [{type: mongoose.Schema.Types.ObjectId, ref: "recipes"}],
});

export const UserModel = mongoose.model("users", UserSchema);