


import { verifyJWT } from "./index.js";
import UserSchema from "../../services/users/schema.js";

export const authorize = async (req, res, next) => {
    try {
      const token = req.cookies.accessToken;
      console.log(req.cookies);
      const decoded = await verifyJWT(token);
      const user = await UserSchema.findOne({ _id: decoded._id });
  
      if (!user) {
        throw new Error();
      }
      req.accessToken = token;
      req.user = user;
      next();
    } catch (error) {
      console.log(error);
        next(error);
    }
  };

  export const adminOnly = async (req, res, next) => {
    try {
      if (req.user.role !== "Admin") {
        res.status(401).send("You are not authorized to access this service!");
        throw new Error();
      }
      next();
    } catch (error) {
      next(error);
    }
  }