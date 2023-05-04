const { postDAO } = require("../data-access");
const { Post, User } = require("../data-access/models");
const { Op } = require("sequelize");

const searchService = {
  async getSearchResult(keyword) {
    const searchResult = await Post.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.like]: `%${keyword}%` } },
          { content: { [Op.like]: `%${keyword}%` } },
        ],
      },
      include: [
        {
          model: User,
          attributes: ["nickname"],
        },
      ],
    });
    return searchResult;
  },
};

module.exports = searchService;
