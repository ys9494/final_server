const express = require("express");
const postRouter = require("./postRouter");
const authRouter = require("./postRouter");

const v1Router = express.Router();

v1Router.use("/posts", postRouter);
v1Router.use("/auth", authRouter);

module.exports = {
  v1: v1Router,
};
