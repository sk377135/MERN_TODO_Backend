import { User } from "../model/user.js";
import bcrypt from "bcrypt";

import { setCookies } from "../utils/feature.js";
import ErrorHandler from "../middlewares/error.js";

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");

    if (!user) return next(new ErrorHandler("Invalid Email or password", 400));

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return next(new ErrorHandler("Invalid Email or password", 400));

    setCookies(user, res, `Welcome back ${user.name}`, 200);
  } catch (error) {
    next(error);
  }
};
export const registerUser = async (req, res, next) => {
  try {
    ////? got the data from the front-end;
    const { name, email, password } = req.body;

    ////? Trying to findout the if already exits;
    let user = await User.findOne({ email });
    if (user) return next(new ErrorHandler("User Already Exist", 400));

    ////? Protecting the password by encripting it;
    const hassedpassword = await bcrypt.hash(password, 10);

    ////? creating the user account ;
    user = await User.create({ name, email, password: hassedpassword });

    ////?  setCookies;
    setCookies(user, res, "Register Successfully", 201);
  } catch (error) {
    next(error);
  }
};

export const findProfile = (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};
export const logout = async (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),

      sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",

      secure: process.env.NODE_ENV === "development" ? false : true,
    })
    .json({
      success: true,
      user: req.user,
    });
};
