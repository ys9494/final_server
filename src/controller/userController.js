const { userService } = require("../service");
const util = require("../misc/util");
const firebaseAdmin = require("../config");

const userController = {
  // 회원가입
  async createUser(req, res, next) {
    try {
      const { userType, name, email, password, nickname, blogname } = req.body;

      let uid;
      // Firebase 사용자 등록
      if (userType === "firebase") {
        const firebaseUser = await firebaseAdmin.auth().createUser({
          email,
          password,
          displayName: nickname,
        });
        uid = firebaseUser.uid;
      }

      const user = await userService.createUser({
        userType,
        uid,
        name,
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
      const { userType, name, email, password, blogname, nickname } = req.body;

      const user = await userService.updateUser(id, userType, {
        name,
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
      if (user.userType === "firebase") {
        await firebaseAdmin.auth().deleteUser(id);
      }

      res
        .clearCookie("accessToken")
        .json(`${user.nickname}님의 탈퇴가 완료되었습니다.`);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = userController;
