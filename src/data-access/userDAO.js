const { User } = require("./models/User");
const util = require("../misc/util");

const userDAO = {
  // 회원가입
  async create({
    userType,
    uid,
    name,
    email,
    password,
    address,
    phoneNumber,
    nickname,
  }) {
    const user = await User.create({
      userType,
      uid: userType === "firebase" ? uid : undefined,
      name,
      email,
      password: userType === "local" ? password : undefined,
      address,
      phoneNumber,
      nickname,
    });
    return user;
  },

  // 단일 사용자 조회
  async findOne(filter) {
    const sanitizedFilter = util.sanitizeObject({
      id: filter.id,
      uid: filter.uid,
      name: filter.name,
      email: filter.email,
      address: filter.address,
      phoneNumber: filter.phoneNumber,
      nickname: filter.nickname,
      userType: filter.userType,
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
  async updateOne(id, userType, toUpdate) {
    const sanitizedToUpdate = util.sanitizeObject({
      name: toUpdate.name,
      email: toUpdate.email,
      password: userType === "local" ? toUpdate.password : undefined,
      address: toUpdate.address,
      phoneNumber: toUpdate.phoneNumber,
      nickname: toUpdate.nickname,
    });

    const [, updatedUsers] = await User.update(sanitizedToUpdate, {
      where: { id },
      returning: true,
    });
    const updatedUser = updatedUsers[0];
    return updatedUser;
  },

  // 사용자 정보 삭제
  async deleteOne(id) {
    const user = await User.findOne({ where: { id } });
    await User.destroy({ where: { id } });
    return user;
  },
};

module.exports = userDAO;
