import express from "express";
import {
  findProfile,
  login,
  logout,
  registerUser,
} from "../controller/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/login", login);

router.post("/new", registerUser);

router.get("/me", isAuthenticated, findProfile);

router.get("/logout", logout);

export default router;
