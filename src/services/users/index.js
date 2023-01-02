import express from "express";
import UserSchema from "./schema.js";


const usersRouter = express.Router();

usersRouter.post("/register", async (req, res, next) => {
    try {
        const newUser = new UserSchema(req.body);
        const { _id } = await newUser.save();
        res.status(201).send(_id);
    } catch (error) {
        console.log(error)
    }
})

export default usersRouter;