


import { verifyJWT } from "./index.js";

export const authorize = async (req, res, next) => {
    try {
      const token = req.cookies.accessToken;
      console.log(req.cookies);
      const decoded = await verifyJWT(token);
      const user = await UserModel.findOne({ _id: decoded._id });
  
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