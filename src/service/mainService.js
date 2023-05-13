const { postDAO } = require("../data-access");

const mainService = {
  async getPosts() {
    const posts = await postDAO.findAll();
    return posts;
  },

  async getPostsByTrending() {
    const posts = await postDAO.findAllByTrending();
    return posts;
  },
};

module.exports = mainService;
