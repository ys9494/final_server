const express = require("express");
const authRouter = require("./authRouter");

const v1Router = express.Router();

v1Router.use("/auth", authRouter);

module.exports = {
  v1: v1Router,
};
