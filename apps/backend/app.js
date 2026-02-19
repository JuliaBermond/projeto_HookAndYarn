import dotenv from "dotenv";
dotenv.config();

import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import path from "path";

import { RouteNotFound } from "./middlewares/error/apiError.js";
import { errorHandler } from "./middlewares/error/errorHandler.js";
import router from "./routes/routes.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.static("public"));
app.use(cookieParser());
app.use("/uploads", express.static(path.resolve("uploads")));

//rotas
app.use("/hookandyarn", router);

//middlewares
app.use((_req, _res, next) => {
  next(new RouteNotFound());
});

app.use(errorHandler);
export default app;
