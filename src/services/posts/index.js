// create a CRUD for the blog posts (title, content, category, cover, createdAt, updatedAt) ref: Category
//
import express from "express";
import { errorHandler } from "../../utilities/errorHandler/index.js";
import { authorize } from "../../utilities/guard/middleware.js";
import { adminOnly } from "../../utilities/guard/middleware.js";
import PostSchema from "./schema.js";
import CategorySchema from "../categories/schema.js";
import { internationalizer } from "../../utilities/internationalizer/index.js";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import cloudinary from "../../utilities/cloudinary/index.js";
import { imageAdd } from "../../utilities/imageAdd/index.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "ai-blog",
  },
});

const cloudinaryMulter = multer({ storage });
const postsRouter = express.Router();

// GET /posts
postsRouter.get("/", async (req, res, next) => {
    try {
        const posts = await PostSchema.find();
        res.send(posts);
    } catch (error) {
        next(error);
    }
    }
);

// GET /posts/:id
postsRouter.get("/:id", async (req, res, next) => {
    try {
        const post = await PostSchema.findById(req.params.id);
        if (post) {
            res.send(post);
        } else {
            res.status(404).send("Post not found!");
        }
    } catch (error) {
        next(error);
    }
}
);


postsRouter.post(
    "/:categoryId",
    cloudinaryMulter.single("image"),
    internationalizer,
    
    imageAdd,
    async (req, res, next) => {
      try {
  console.log(req.body)
      const newPost = new PostSchema(req.body);
        
        const { _id } = await newPost.save();
        const category = await CategorySchema.findById(req.params.categoryId);
  
        category.posts.push(_id);
        await category.save();
        res.status(201).send(_id);
      } catch (error) {
        next(error);
      }
    }
  );

// PUT /posts/:id
postsRouter.put("/:id", authorize, adminOnly, internationalizer, async (req, res, next) => {
    try {
        const post = await PostSchema.findByIdAndUpdate(req.params.id, req.body, {
            runValidators: true,
            new: true,
        });
        if (post) {
            res.send(post);
        }
    } catch (error) {
        next(error);
    }
}
);

// DELETE /posts/:id
postsRouter.delete("/:id", authorize, adminOnly, async (req, res, next) => {
    try {
        const post = await PostSchema.findByIdAndDelete(req.params.id);
        if (post) {
            res.send("Deleted");
        } else {
            res.status(404).send("Post not found!");
        }
    } catch (error) {
        next(error);
    }
}
);

postsRouter.use(errorHandler);

export default postsRouter;


