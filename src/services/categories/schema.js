import { Schema, model } from "mongoose";

const CategorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
  posts: [
    {
        type: Schema.Types.ObjectId,
        ref: "Post",
    },
    ],
});

export default model("Category", CategorySchema);

 
    