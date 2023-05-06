const { postDAO } = require("../data-access");

const postService = {
  async createPost(postDTO) {
    const createdPost = await postDAO.create(postDTO);
    return createdPost;
  },

  async getPostsByCategory(userId, categoryId) {
    const posts = await postDAO.findAllBy({
      userId,
      categoryId,
    });
    return posts;
  },

  async getPost(id) {
    const post = await postDAO.findOne({ id });
    return post;
  },

  async updatePost(id, postDto) {
    const updatedPost = await postDAO.updateOne(postDto, { id });
    return updatedPost;
  },

  async deletePost(id) {
    const deletedPost = await postDAO.deleteOne({ id });
    return deletedPost;
  },
};

module.exports = postService;
