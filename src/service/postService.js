const { postDAO } = require("../data-access");
const { Post, Category, User, Comment } = require("../data-access/models");

const postService = {
  async createPost(postDto) {
    const createdPost = await Post.create(postDto);
    return createdPost;
  },

  async getPostsByCategory(userId, categoryId) {
    const posts = await Post.findAll({
      where: {
        userId,
        categoryId,
      },
      include: [
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

    return posts;
  },

  async getPost(id) {
    const post = await Post.findOne({
      where: {
        id,
      },
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

  async updatePost(id, postDto) {
    const updatedPost = await Post.update(postDto, {
      where: {
        id,
      },
      returning: true,
    });

    return updatedPost;
  },

  async deletePost(id) {
    const deletedPost = await Post.destroy({
      where: {
        id,
      },
    });
    return deletedPost;
  },
};

module.exports = postService;
