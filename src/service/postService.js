const { postDAO } = require("../data-access");
const { Post } = require("../models");

const postService = {
  async createPost(postDto) {
    const createdPost = await Post.create(postDto);
    return createdPost;
  },

  async getCategory(userId) {
    const category = await Post.findAll({
      attributes: ["category"],
      group: ["category"],
    });
    
    const categories = category.map((item) => item.category);

    return categories;
  },
  // async getPost(id) {
  //   const post = await postDAO.findOne(id);
  //   return post;
  // },
  // async getPosts({ title, author }) {
  //   const posts = await postDAO.findMany({ title, author });
  //   return posts;
  // },
  // async updatePost(id, { title, content, author }) {
  //   const updatedPost = await postDAO.updateOne(id, { title, content, author });
  //   return updatedPost;
  // },
  // async deletePost(id) {
  //   const deletedPost = await postDAO.deleteOne(id);
  //   return deletedPost;
  // },
  // async deletePosts({ title, author }) {
  //   const deletedPosts = await postDAO.deleteMany({ title, author });
  //   return deletedPosts;
  // },
};

module.exports = postService;
