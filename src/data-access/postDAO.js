const { Post, Category, User, Comment } = require("./models");
const util = require("../misc/util");

const postDAO = {
  // 게시글 작성
  async create(postDTO) {
    const createdPost = await Post.create(postDTO);
    return createdPost;
  },

  // 게시글 상세 조회
  async findOne(filter) {
    const sanitizedFilter = util.sanitizeObject(filter);

    const post = await Post.findOne({
      where: sanitizedFilter,
      include: [
        {
          model: Category,
          attributes: ["id", "name"],
        },
        {
          model: User,
          attributes: ["nickname"],
        },
        {
          model: Comment,
          attributes: ["id", "content", "createdAt"],
          include: {
            model: User,
            attributes: ["nickname"],
          },
        },
      ],
    });

    return post;
  },

  // 게시글 조건 조회
  async findAllBy(filter) {
    const sanitizedFilter = util.sanitizeObject(filter);

    const posts = await Post.findAll({
      where: sanitizedFilter,
      include: [
        {
          model: User,
          attributes: ["nickname"],
        },
      ],
    });

    return posts;
  },

  // 게시글 전체 조회
  async findAll() {
    const posts = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["nickname"],
        },
      ],
    });

    return posts;
  },

  // 게시글 수정
  async updateOne(postDTO, filter) {
    const sanitizedToUpdate = util.sanitizeObject(filter);

    const updatedPost = await Post.update(postDTO, {
      where: sanitizedToUpdate,
      returning: true,
    });

    return updatedPost;
  },

  // 게시글 삭제
  async deleteOne(filter) {
    const sanitizedToUpdate = util.sanitizeObject(filter);

    const deletedPost = await Post.destroy({
      where: sanitizedToUpdate,
    });
    return deletedPost;
  },
};

module.exports = postDAO;
