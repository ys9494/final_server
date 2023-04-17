const express = require("express");
const postRouter = require("./postRouter");

const v1Router = express.Router();

v1Router.use("/posts", postRouter);

module.exports = {
  v1: v1Router,
};
