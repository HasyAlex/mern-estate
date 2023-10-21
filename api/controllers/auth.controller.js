import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json("User Created!");
  } catch (error) {
    ////basic error
    // res.status(500).json(error.message);

    ////since we have error handing middleware
    // next(error);

    ////but we can customize more (we can pass our errors)
    next(errorHandler(550, "error from the function"));
  }
};
