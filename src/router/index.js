const express = require("express");
const postRouter = require("./postRouter");
const userRouter = require("./userRouter");
const categoryRouter = require("./categoryRouter");

const v1Router = express.Router();

v1Router.use("/posts", postRouter);
v1Router.use("/users", userRouter);
v1Router.use("/categories", categoryRouter);

module.exports = {
  v1: v1Router,
};
