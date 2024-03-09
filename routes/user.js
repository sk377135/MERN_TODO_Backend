import express from "express";
import {
  findProfile,
  login,
  logout,
  registerUser,
} from "../controller/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/new", registerUser);

router.post("/login", login);

router.get("/logout", logout);

router.get("/me", isAuthenticated, findProfile);

export default router;
