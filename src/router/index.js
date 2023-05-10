const express = require("express");
const postRouter = require("./postRouter");
const categoryRouter = require("./categoryRouter");
const authRouter = require("./authRouter");
const commentRouter = require("./commentRouter");
const searchRouter = require("./searchRouter");
const userRouter = require("./userRouter");

const v1Router = express.Router();

v1Router.use("/posts", postRouter);
v1Router.use("/categories", categoryRouter);
v1Router.use("/auth", authRouter);
v1Router.use("/comments", commentRouter);
v1Router.use("/search", searchRouter);
v1Router.use("/user", userRouter);

module.exports = {
  v1: v1Router,
};
