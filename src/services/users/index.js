import { Router } from "express";
import { errorHandler } from "../../utilities/errorHandler/index.js";
import { authorize } from "../../utilities/guard/middleware.js";
import UserSchema from "./schema.js";


const usersRouter = Router();

usersRouter.post("/register", async (req, res, next) => {
    try {
        const newUser = new UserSchema(req.body);
        const { _id } = await newUser.save();
        res.status(201).send(_id);
    } catch (error) {
        console.log(error)
    }
})

usersRouter.post("/login", async (req, res, next) => {
    try {
      const { email, password } = req.body;
      console.log(email, password);
      const user = await UserSchema.findByCredentials(email, password);
      console.log(user);
      if (user) {
        const tokens = await authenticate(user);
        res.cookie("accessToken", tokens.token, {
          sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
          secure: process.env.NODE_ENV === "production" ? true : false,
        });
        res
          .cookie("refreshToken", tokens.refreshToken, {
            sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
            secure: process.env.NODE_ENV === "production" ? true : false,
          })
          .status(200)
          .send({ message: "login successful", user });
      } else {
        res.status(404).send({ message: "login failed" });
      }
    } catch (error) {
      res.send({ message: error });
      next(error);
    }
  });
  
  // logout to clean the cookies
  usersRouter.post("/logout", async (req, res, next) => {
    try {
      res
        .clearCookie("accessToken", {
          sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
          secure: process.env.NODE_ENV === "production" ? true : false,
        })
        .clearCookie("refreshToken", {
          sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
          secure: process.env.NODE_ENV === "production" ? true : false,
        })
        .status(200)
        .send({ message: "logout successful" });
    } catch (error) {
      res.send({ message: error });
      next(error);
    }
  });
  
  // tested
  usersRouter.get("/refreshToken", async (req, res, next) => {
    try {
      const oldRefreshToken = req.cookies.refreshToken;
      const newTokens = await refresh(oldRefreshToken);
      res.cookie("token", newTokens.token, {
        httpOnly: true,
      });
      res
        .cookie("refreshToken", newTokens.refreshToken, {
          httpOnly: true,
          path: "/api/users/refreshToken",
        })
        .send("ok");
    } catch (error) {
      next(await errorHandler(error));
    }
  });
  // tested
  usersRouter.get("/me", authorize, async (req, res, next) => {
    try {
      res.send(req.user);
    } catch (error) {
      next(error);
    }
  });
export default usersRouter;