const { userDAO } = require("../data-access");
const util = require("../misc/util");

const userService = {
  async createUser({ uid, blogName, email, nickname }) {
    const existedEmail = await userDAO.findOne({ email });
    if (existedEmail) {
      throw new Error("이미 가입된 이메일입니다.");
    }

    const existedNickname = await userDAO.findOne({ nickname });
    if (existedNickname) {
      throw new Error("중복되는 닉네임입니다.");
    }

    const createdUser = await userDAO.create({
      uid,
      blogName,
      email,
      nickname,
    });
    return createdUser;
  },

  async getUser(uid) {
    const user = await userDAO.findOne({ uid });
    return user;
  },

  async getAllUsers(page, perPage) {
    const { users, total, totalPage } = await userDAO.findAll(page, perPage);
    return { users, total, totalPage };
  },

  async updateUser(uid, { blogName, email, nickname }) {
    // email 수정하는 경우 이메일 중복 검사
    if (email !== undefined) {
      const existedEmail = await userDAO.findOne({ email });
      if (existedEmail) {
        throw new Error("이미 가입된 이메일입니다.");
      }
    }

    // nickname 수정하는 경우 닉네임 중복 검사
    if (nickname !== undefined) {
      const existedNickname = await userDAO.findOne({ nickname });
      if (existedNickname) {
        throw new Error("중복되는 닉네임입니다.");
      }
    }

    const updatedUser = await userDAO.updateOne(uid, {
      email,
      blogName,
      nickname,
    });
    const servedUser = util.removePassword(updatedUser);
    return servedUser;
  },

  async deleteUser(uid) {
    const deletedUser = await userDAO.deleteOne(uid);
    if (!deletedUser) {
      throw new Error("탈퇴할 사용자가 존재하지 않습니다.");
    }
    return deletedUser;
  },
};

module.exports = userService;
