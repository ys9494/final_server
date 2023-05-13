const { mainService } = require("../service");
const { Post } = require("../data-access/models");
const util = require("../misc/util");

const mainController = {
  async getPosts(req, res, next) {
    try {
      const posts = await mainService.getPosts({});
      res.status(200).json(util.buildResponse(posts));
    } catch (error) {
      next(error);
    }
  },

  async getPostsByTrending(req, res, next) {
    try {
      const posts = await mainService.getPostsByTrending({});
      res.json(util.buildResponse(posts));
    } catch (error) {
      next(error);
    }
  },
};

module.exports = mainController;
