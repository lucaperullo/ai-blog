import { Schema, model } from "mongoose";

const CategorySchema = new Schema({
    title: {
        it: {
            type: String,
            required: true,
          },
            en: {
                type: String,
                required: true,
            },
            fr: {
                type: String,
                required: true,
            },
            de: {
                type: String,
                required: true,
            },
            ru: {
                type: String,
                required: true,
            },
            es: {
                type: String,
                required: true,
            },
    },
    content: {
        it: {
            type: String,
            required: true,
          },
            en: {
                type: String,
                required: true,
            },
            fr: {
                type: String,
                required: true,
            },
            de: {
                type: String,
                required: true,
            },
            ru: {
                type: String,
                required: true,
            },
            es: {
                type: String,
                required: true,
            },
    },
  posts: [
    {
        type: Schema.Types.ObjectId,
        ref: "Post",
    },
    ],
});

export default model("Category", CategorySchema);

 
    