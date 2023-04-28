const { userService } = require("../service");
const util = require("../misc/util");
const firebaseAdmin = require("../config");

const userController = {
  // 회원가입
  async createUser(req, res, next) {
    try {
      const { email, password, nickname, blogname } = req.body;

      const firebaseUser = await firebaseAdmin.auth().createUser({
        email,
        password,
        displayName: nickname,
      });
      const uid = firebaseUser.uid;

      const user = await userService.createUser({
        uid,
        email,
        password,
        blogname,
        nickname,
      });
      res.status(201).json(util.buildResponse(user));
    } catch (error) {
      next(error);
    }
  },

  // 사용자 정보 수정
  async updateUser(req, res, next) {
    try {
      const { id } = req.params;
      const { email, password, blogname, nickname } = req.body;

      const user = await userService.updateUser(id, {
        email,
        password,
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
      const { id } = req.params;
      const user = await userService.getUser(id);
      res.json(util.buildResponse(user));
    } catch (error) {
      next(error);
    }
  },

  // 사용자 정보 삭제 (회원 탈퇴)
  async deleteUser(req, res, next) {
    try {
      const { id } = req.params;
      const user = await userService.deleteUser(id);

      // Firebase 사용자 삭제
      await firebaseAdmin.auth().deleteUser(id);

      res
        .clearCookie("accessToken")
        .json(`${user.nickname}님의 탈퇴가 완료되었습니다.`);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = userController;
