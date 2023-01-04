import {Schema, model} from "mongoose";

const PostSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    cover: {
        type: String,
        required: true,
    },

  
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
    },
    content: {
        type: String,
        required: true,
    },
});

export default model("Post", PostSchema);