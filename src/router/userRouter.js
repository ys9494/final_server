const express = require("express");
const { userController } = require("../controller");
// const { userMiddelware } = require("../middleware");

const userRouter = express.Router();

userRouter.post(
  "/",
  //   userMiddelware.checkCompletePostFrom("body"),
  userController.signup
);

module.exports = userRouter;
