const { userService } = require("../service");
const util = require("../misc/util");
const { getAuth, initPromise } = require("../config").firebase;

const userController = {
  // 회원가입
  async createUser(req, res, next) {
    try {
      const { email, password, nickname, blogName, bio } = req.body;
      console.log(req.body);
      await initPromise;
      const firebaseAuth = getAuth();

      // Firebase 사용자 생성
      const firebaseUser = await firebaseAuth.createUser({
        email,
        password,
        displayName: nickname,
      });

      const id = firebaseUser.uid; // uid를 가져옵니다.

      // 데이터베이스에 사용자 정보 저장
      const user = await userService.createUser({
        id,
        email,
        password,
        nickname,
        blogName,
        bio,
        blogName,
        bio,
      });

      res.status(201).json(util.buildResponse(user));
    } catch (error) {
      next(error);
    }
  },

  // 사용자 정보 수정
  async updateUser(req, res, next) {
    try {
      const id = req.uid; // 수정된 부분
      const { email, blogname, nickname } = req.body;

      const user = await userService.updateUser(id, {
        email,
        nickname,
        blogName,
        bio,
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
      const id = req.uid; // 수정된 부분
      const user = await userService.getUser(id);
      res.json(util.buildResponse(user));
    } catch (error) {
      next(error);
    }
  },

  // 닉네임으로 사용자 정보 조회(유저 본인)
  async getMyPageByNickname(req, res, next) {
    try {
      const { nickname } = req.query;
      const result = await userService.getMyPageByNickname(nickname);
      if (!result) {
        return res.status(404).send("존재하지 않는 닉네임입니다.");
      }
      res.json(util.buildResponse(result));
    } catch (error) {
      next(error);
    }
  },

  // 닉네임으로 사용자 정보 조회(타유저)
  async getUserByNickname(req, res, next) {
    try {
      const { nickname } = req.query;
      const result = await userService.getUserByNickname(nickname);
      if (!result) {
        return res.status(404).send("존재하지 않는 닉네임입니다.");
      }
      res.json(util.buildResponse(result));
    } catch (error) {
      next(error);
    }
  },

  // 사용자 정보 삭제 (회원 탈퇴)
  async deleteUser(req, res, next) {
    try {
      const id = req.uid; // 수정된 부분
      const user = await userService.deleteUser(uid);

      // Firebase 사용자 삭제
      await auth.deleteUser(id);

      res
        .clearCookie("accessToken")
        .json(`${user.nickname}님의 탈퇴가 완료되었습니다.`);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = userController;
