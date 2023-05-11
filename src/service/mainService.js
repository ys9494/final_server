const { postDAO } = require("../data-access");

const mainService = {
  async getPosts() {
    const posts = await postDAO.findAll();
    return posts;
  },
};

module.exports = mainService;
