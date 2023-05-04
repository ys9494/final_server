const { categoryService } = require("../service");
const { Category } = require("../data-access/models");
const util = require("../misc/util");

const categoryController = {
  async postCategory(req, res, next) {
    /** 추후 session으로부터 userId 받아오는 로직으로 변경 필요. */
    const userId = 1;
    try {
      const { name } = req.body;
      const categoryDto = {
        userId,
        name,
      };
      const newCategory = await categoryService.createCategory(categoryDto);
      res.status(201).json(util.buildResponse(newCategory));
    } catch (error) {
      next(error);
    }
  },

  async getCategories(req, res, next) {
    /** 추후 session으로부터 userId 받아오는 로직으로 변경 필요. */
    const userId = 1;
    try {
      const categories = await categoryService.getCategories(userId);
      res.json(util.buildResponse(categories));
    } catch (error) {
      next(error);
    }
  },

  async putCategory(req, res, next) {
    /** 추후 session으로부터 userId 받아오는 로직으로 변경 필요. */
    const userId = 1;

    try {
      const { id } = req.params;
      const { name } = req.body;

      const categoryDto = {
        name,
      };

      const updatedCategory = await categoryService.updateCategory(
        id,
        categoryDto
      );
      res.json(util.buildResponse(updatedCategory));
    } catch (error) {
      next(error);
    }
  },

  async deleteCategory(req, res, next) {
    /** 추후 session으로부터 userId 받아오는 로직으로 변경 필요. */
    const userId = 1;

    try {
      const { id } = req.params;
      const category = await categoryService.deleteCategory(id);
      res.json(util.buildResponse(category));
    } catch (error) {
      next(error);
    }
  },
};

module.exports = categoryController;
