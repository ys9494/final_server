const { postDAO } = require("../data-access");

const postService = {
  async createPost({ title, content, author }) {
    const createdPost = await postDAO.create({
      title,
      content,
      author,
    });
    return createdPost;
  },
  async getPost(id) {
    const post = await postDAO.findOne(id);
    return post;
  },
  async getPosts({ title, author }) {
    const posts = await postDAO.findMany({ title, author });
    return posts;
  },
  async updatePost(id, { title, content, author }) {
    const updatedPost = await postDAO.updateOne(id, { title, content, author });
    return updatedPost;
  },
  async deletePost(id) {
    const deletedPost = await postDAO.deleteOne(id);
    return deletedPost;
  },
  async deletePosts({ title, author }) {
    const deletedPosts = await postDAO.deleteMany({ title, author });
    return deletedPosts;
  },
};

module.exports = postService;
