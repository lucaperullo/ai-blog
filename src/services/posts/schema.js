import {Schema, model} from "mongoose";

const PostSchema = new Schema({
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
    cover: {
        type: String,
    
    },

  
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
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
});

export default model("Post", PostSchema);