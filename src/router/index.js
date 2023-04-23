const express = require("express");
const postRouter = require("./postRouter");
const userRouter = require("./userRouter");

const v1Router = express.Router();

v1Router.use("/posts", postRouter);
v1Router.use("/users", userRouter);

module.exports = {
  v1: v1Router,
};
