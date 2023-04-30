const express = require("express");
const { authMiddleware, userMiddleware } = require("../middleware");
const { authController, userController } = require("../controller");

const authRouter = express.Router();

// 회원가입
authRouter.post(
  "/join",
  (req, res, next) => {
    console.log("POST /join 요청 처리 시작");
    console.log("req.body:", req.body);
    next();
  },
  userMiddleware.checkJoinFrom,
  (req, res, next) => {
    console.log("Received request on /join route"); // 로그 추가
    console.log("req.body:", req.body);
    next();
  },
  userController.createUser
);

// 로그인 (Firebase 사용)
authRouter.post(
  "/login",
  authMiddleware.checkLoginFrom,
  authController.loginUser
);

// 로그아웃
authRouter.post("/logout", authController.logoutUser);

// 사용자 정보 삭제 (회원 탈퇴)
authRouter.delete(
  "/:id",
  authMiddleware.verifyIdToken,
  userMiddleware.checkUserIdFrom("params"),
  userController.deleteUser
);

module.exports = authRouter;
