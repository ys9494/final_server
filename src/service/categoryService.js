const { categoryDAO, postDAO } = require("../data-access");

const categoryService = {
  async createCategory(categoryDTO) {
    const createdCategory = await categoryDAO.create(categoryDTO);
    return createdCategory;
  },

  async getCategories(userId) {
    const categories = await categoryDAO.findAllBy({ userId });
    return categories;
  },

  async updateCategory(id, categoryDTO) {
    const updatedCategory = await categoryDAO.updateOne(categoryDTO, { id });
    return updatedCategory;
  },

  async deleteCategory(id) {
    const deletedCategory = await categoryDAO.deleteOne({ id });

    const postDTO = { categoryId: null };
    const updatePostCategory = await postDAO.updateOne(postDTO, {
      categoryId: id,
    });

    return { deletedCategory, updatePostCategory };
  },
};

module.exports = categoryService;
