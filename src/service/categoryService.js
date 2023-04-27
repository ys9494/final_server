const { Category, Post, User } = require("../data-access/models");

const categoryService = {
  async createCategory(categoryDto) {
    const createdCategory = await Category.create(categoryDto);
    return createdCategory;
  },

  async getCategories(userId) {
    const categories = await Category.findAll({
      where: {
        userId,
      },
    });

    return categories;
  },

  async updateCategory(id, userId, categoryDto) {
    console.log("id", id);
    const updatedCategory = await Category.update(categoryDto, {
      where: {
        id,
        userId,
      },
    });

    return updatedCategory;
  },

  async deleteCategory(id, userId) {
    const deletedCategory = await Category.destroy({
      where: {
        id,
        userId,
      },
    });

    const updatePostCategory = await Post.update(
      {
        categoryId: null,
      },
      {
        where: {
          categoryId: id,
        },
      }
    );

    return { deletedCategory, updatePostCategory };
  },
};

module.exports = categoryService;
