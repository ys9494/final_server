const express = require("express");
const { authMiddleware, userMiddleware } = require("../middleware");
const { authController, userController } = require("../controller");

const authRouter = express.Router();

// 회원가입
authRouter.post(
  "/join",
  userMiddleware.checkJoinFrom(), // 파라미터 제거
  userController.createUser
);

// 로그인 (Firebase 사용)
authRouter.post(
  "/login",
  authMiddleware.checkLoginFrom(), // 파라미터 제거
  authController.loginUser // 수정된 로그인 함수
);

// 로그아웃
authRouter.post("/logout", authController.logoutUser);

// 사용자 정보 삭제 (회원 탈퇴)
authRouter.delete(
  "/:id",
  authMiddleware.verifyIdToken, // 파라미터 제거 및 수정된 미들웨어 이름
  userMiddleware.checkUserIdFrom("params"),
  userController.deleteUser
);

module.exports = authRouter;
