const { categoryService } = require("../service");
const { Category } = require("../data-access/models");
const util = require("../misc/util");

const categoryController = {
  async postCategory(req, res, next) {
    /** 추후 userId 받아오는 로직으로 변경 필요. */
    const userId = "WdezqbRDNkclowRnLUu6s4KETwp2";
    try {
      const { name } = req.body;
      const categoryDTO = {
        UserId: userId,
        name,
      };
      const newCategory = await categoryService.createCategory(categoryDTO);
      res.status(201).json(util.buildResponse(newCategory));
    } catch (error) {
      next(error);
    }
  },

  async getCategories(req, res, next) {
    /** 추후 userId 받아오는 로직으로 변경 필요. */
    const userId = 1;
    try {
      const categories = await categoryService.getCategories(userId);
      res.json(util.buildResponse(categories));
    } catch (error) {
      next(error);
    }
  },

  async patchCategory(req, res, next) {
    /** 추후 userId 받아오는 로직으로 변경 필요. */
    const userId = 1;

    try {
      const { categoryId } = req.params;
      const { name } = req.body;

      const categoryDTO = {
        name,
      };

      const updatedCategory = await categoryService.updateCategory(
        categoryId,
        categoryDTO
      );
      res.json(util.buildResponse(updatedCategory));
    } catch (error) {
      next(error);
    }
  },

  async deleteCategory(req, res, next) {
    /** 추후 userId 받아오는 로직으로 변경 필요. */
    const userId = 1;

    try {
      const { categoryId } = req.params;
      const category = await categoryService.deleteCategory(categoryId);
      res.json(util.buildResponse(category));
    } catch (error) {
      next(error);
    }
  },
};

module.exports = categoryController;
