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

  async updateCategory(id, categoryDto) {
    const updatedCategory = await Category.update(categoryDto, {
      where: {
        id,
      },
    });
    return updatedCategory;
  },

  async deleteCategory(id) {
    const deletedCategory = await Category.destroy({
      where: {
        id,
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
