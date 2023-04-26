const express = require("express");
const passport = require("passport");
const { authMiddleware, userMiddleware } = require("../middleware");
const { authController, userController } = require("../controller");

const authRouter = express.Router();

// 회원가입
authRouter.post(
  "/join",
  userMiddleware.checkJoinFrom("body"),
  userController.createUser
);

// 로그인
authRouter.post(
  "/login",
  authMiddleware.checkLoginFrom("body"),
  authMiddleware.existsToken,
  passport.authenticate("local", { session: false }),
  authController.login
);

// 로그아웃
authRouter.post("/logout", authController.logout);

// 사용자 정보 삭제 (회원 탈퇴)
authRouter.delete(
  "/:id",
  authMiddleware.verifyAuthorizedUser("params"),
  userMiddleware.checkUserIdFrom("params"),
  userController.deleteUser
);

module.exports = authRouter;
