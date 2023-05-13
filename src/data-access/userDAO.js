const { User, Post, Category } = require("./models");
const util = require("../misc/util");

const userDAO = {
  // 회원가입
  async create({ id, email, blogName, nickname, bio }) {
    const user = await User.create({
      id,
      email,
      blogName,
      nickname,
      bio,
    });
    return user;
  },

  // 단일 사용자 조회
  async findOne(filter) {
    const sanitizedFilter = util.sanitizeObject({
      id: filter.id,
      email: filter.email,
      blogName: filter.blogName,
      nickname: filter.nickname,
      bio: filter.bio,
    });

    const user = await User.findOne({ where: sanitizedFilter });
    return user;
  },

  // 마이페이지에서 본인 정보 조회
  async findMyDetail(filter) {
    const sanitizedFilter = util.sanitizeObject({
      id: filter.id,
      email: filter.email,
      blogName: filter.blogName,
      nickname: filter.nickname,
      bio: filter.bio,
    });

    const user = await User.findOne({
      where: sanitizedFilter,
      include: [
        {
          model: Category,
          attributes: ["id", "name"],
        },
        {
          model: Post,
          attributes: [
            "id",
            "title",
            "content",
            "summary",
            "createdAt",
            "updatedAt",
          ],
        },
      ],
    });
    return user;
  },

  // 타 유저 페이지 조회
  async findOneDetail(filter) {
    const sanitizedFilter = util.sanitizeObject({
      id: filter.id,
      email: filter.email,
      blogName: filter.blogName,
      nickname: filter.nickname,
      bio: filter.bio,
    });

    const user = await User.findOne({
      where: sanitizedFilter,
      include: [
        {
          model: Category,
          attributes: ["id", "name"],
        },
        {
          model: Post,
          attributes: [
            "id",
            "title",
            "content",
            "summary",
            "createdAt",
            "updatedAt",
          ],
        },
      ],
    });
    return user;
  },

  // 모든 사용자 조회
  async findAll() {
    const users = await User.findAll();
    return users;
  },

  // 사용자 정보 수정
  async updateOne(id, toUpdate) {
    const sanitizedToUpdate = util.sanitizeObject({
      blogName: toUpdate.blogName,
      nickname: toUpdate.nickname,
      bio: toUpdate.bio,
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
