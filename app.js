import express from "express";
import router from "./routes/user.js";
import Task_router from "./routes/task.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";

import cors from "cors";

export const app = express();

config({
  path: "./database/config.env",
});

app.use(express.json());

app.use(cookieParser());

app.use(
  cors({
    origin: [process.env.Frontend_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/api/v1/user", router);
app.use("/api/v1/task", Task_router);

app.get("/", (req, res) => {
  res.send("nice working");
});

app.use(errorMiddleware);
