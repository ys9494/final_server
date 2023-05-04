const { userService } = require("../service");
const util = require("../misc/util");
const { auth, initPromise } = require("../config").firebase;

const userController = {
  // 회원가입
  async createUser(req, res, next) {
    try {
      console.log("Received create user request");
      const { email, password, nickname, blogname } = req.body;

      await initPromise;
      const firebaseAuth = auth();
      const firebaseUser = await firebaseAuth.createUser({
        email,
        password,
        displayName: nickname,
      });
      console.log("Created Firebase user:", firebaseUser);

      const uid = firebaseUser.uid;

      const user = await userService.createUser({
        uid,
        email,
        blogname,
        nickname,
      });
      console.log("Created user:", user);

      res.status(201).json(util.buildResponse(user));
    } catch (error) {
      console.error("Error in createUser:", error);
      next(error);
    }
  },

  // 사용자 정보 수정
  async updateUser(req, res, next) {
    try {
      const { uid } = req.params;
      const { email, blogname, nickname } = req.body;

      const user = await userService.updateUser(uid, {
        email,
        blogname,
        nickname,
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
      await auth.deleteUser(uid);

      res
        .clearCookie("accessToken")
        .json(`${user.nickname}님의 탈퇴가 완료되었습니다.`);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = userController;
