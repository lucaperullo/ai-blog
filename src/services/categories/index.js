// create a CRUD for the categories (name, description, posts, createdAt, updatedAt) ref: Post

import express from "express";
import { errorHandler } from "../../utilities/errorHandler/index.js";
import { authorize } from "../../utilities/guard/middleware.js";
import { adminOnly } from "../../utilities/guard/middleware.js";
import CategorySchema from "./schema.js";

const categoriesRouter = express.Router();

// GET /categories
categoriesRouter.get("/", async (req, res, next) => {
    try {
        const categories = await CategorySchema.find();
        

        res.send(categories);
    } catch (error) {
        next(error);
    }
    }
);

// GET /categories/:id
categoriesRouter.get("/:id", async (req, res, next) => {
    try {
        const category = await CategorySchema.findById(req.params.id);
        if (category) {
            let populatedCategory = await category.populate("posts");
            res.send(populatedCategory);
            
        } else {
            res.status(404).send("Category not found!");
        }
    } catch (error) {
        next(error);
    }
}
);

// POST /categories
categoriesRouter.post("/", authorize, adminOnly, async (req, res, next) => {
    try {
        const newCategory = new CategorySchema(req.body);
         await newCategory.save();
        res.status(201).send(newCategory);
    } catch (error) {
        next(error);
    }
}
);

// PUT /categories/:id
categoriesRouter.put("/:id", authorize, adminOnly, async (req, res, next) => {
    try {
        const category = await CategorySchema.findByIdAndUpdate(req.params.id, req.body, {
            runValidators: true,
            new: true,
        });
        if (category) {
            res.send(category);
        } else {
            res.status(404).send("Category not found!");
        }
    } catch (error) {
        next(error);
    }
}
);

// DELETE /categories/:id
categoriesRouter.delete("/:id", authorize, adminOnly, async (req, res, next) => {
    try {
        const category = await CategorySchema.findByIdAndDelete(req.params.id);
        if (category) {
            res.send("Deleted");
        } else {
            res.status(404).send("Category not found!");
        }
    } catch (error) {
        next(error);
    }
}
);

// ERROR HANDLER
categoriesRouter.use(errorHandler);

export default categoriesRouter;