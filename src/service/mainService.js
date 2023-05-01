const { Post } = require("../data-access/models");

const mainService = {
  async getPosts() {
    const posts = await Post.findAll({});
    return posts;
  },
};

module.exports = mainService;
