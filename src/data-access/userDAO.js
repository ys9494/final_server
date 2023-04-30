const User = require("./models/user");
const util = require("../misc/util");

const userDAO = {
  // 회원가입
  async create(uid, email, password, nickname, blogName, bio, admin) {
    const user = await User.create(
      uid,
      email,
      password,
      nickname,
      blogName,
      bio,
      admin
    );
    return user;
  },

  // 단일 사용자 조회
  async findOne(filter) {
    const sanitizedFilter = util.sanitizeObject({
      uid: filter.uid,
      email: filter.email,
      blogName: filter.blogName,
      nickname: filter.nickname,
    });

    const user = await User.findOne({ where: sanitizedFilter });
    return user;
  },

  // 모든 사용자 조회
  async findAll() {
    const users = await User.findAll();
    return users;
  },

  // 사용자 정보 수정
  async updateOne(uid, toUpdate) {
    const sanitizedToUpdate = util.sanitizeObject({
      email: toUpdate.email,
      blogName: toUpdate.blogName,
      nickname: toUpdate.nickname,
    });

    const [, updatedUsers] = await User.update(sanitizedToUpdate, {
      where: { uid },
      returning: true,
    });
    const updatedUser = updatedUsers[0];
    return updatedUser;
  },

  // 사용자 정보 삭제
  async deleteOne(uid) {
    const user = await User.findOne({ where: { uid } });
    await User.destroy({ where: { uid } });
    return user;
  },
};

module.exports = userDAO;
