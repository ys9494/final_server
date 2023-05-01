const { userService } = require("../service");
const util = require("../misc/util");
const firebaseAdmin = require("../config");

const userController = {
  // 회원가입
  async createUser(req, res, next) {
    try {
      console.log("Received create user request"); // 로그 1: 요청이 시작되었음을 확인
      const { email, password, nickname, blogName, bio} = req.body;

      const firebaseUser = await firebaseAdmin.auth.createUser({
        email,
        password,
        displayName: nickname,
      });
      console.log("Created Firebase user:", firebaseUser); // 로그 2: Firebase 사용자 생성 성공

      const uid = firebaseUser.uid;

      console.log("uid", uid);

      const user = await userService.createUser({
        uid,
        email,
        nickname,
        blogName,
        bio,
      });
      console.log("Created user:", user); // 로그 3: 데이터베이스에 사용자 생성 성공

      res.status(201).json(util.buildResponse(user));
    } catch (error) {
      console.error("Error in createUser:", error); // 로그 4: 에러 발생시 출력
      next(error);
    }
  },

  // 사용자 정보 수정
  async updateUser(req, res, next) {
    try {
      const { uid } = req.params;
      const { email, nickname, blogName, bio } = req.body;

      const user = await userService.updateUser(uid, {
        email,
        nickname,
        blogName,
        bio,
      });
      res.json(util.buildResponse(user));
    } catch (error) {
      next(error);
    }
  },

  // 사용자 정보 조회
  async getUser(req, res, next) {
    try {
      const { uid } = req.params;
      const user = await userService.getUser(uid);
      res.json(util.buildResponse(user));
    } catch (error) {
      next(error);
    }
  },

  // 사용자 정보 삭제 (회원 탈퇴)
  async deleteUser(req, res, next) {
    try {
      const { uid } = req.params;
      const user = await userService.deleteUser(uid);

      // Firebase 사용자 삭제
      await firebaseAdmin.auth.deleteUser(uid);

      res
        .clearCookie("accessToken")
        .json(`${user.nickname}님의 탈퇴가 완료되었습니다.`);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = userController;
