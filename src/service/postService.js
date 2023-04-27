const { postDAO } = require("../data-access");
const { Post, Category, User } = require("../data-access/models");

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
      ],
    });
    return post;
  },

  async updatePost(id, postDto) {
    const updatedPost = await Post.update(postDto, {
      where: {
        id,
      },
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

  // async getPosts({ title, author }) {
  //   const posts = await postDAO.findMany({ title, author });
  //   return posts;
  // },
};

module.exports = postService;
