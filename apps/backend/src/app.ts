import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import api from "./api";

import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(
  cors({
    origin: ["http://localhost:3000", "https://shrnik.github.io"],
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "🦄🌈✨👋🌎🌍🌏✨🌈🦄",
  });
});

app.use("/api", api);

// set cors headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("cross-origin-resource-policy", "cross-origin");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

export default app;
