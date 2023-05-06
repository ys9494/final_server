const { commentDAO } = require("../data-access");

const commentService = {
  async createComment(commentDTO) {
    const createdComment = await commentDAO.create(commentDTO);
    return createdComment;
  },

  async updateComment(id, commentDTO) {
    const updatedComment = await commentDAO.updateOne(commentDTO, { id });
    return updatedComment;
  },

  async deleteComment(id) {
    const deletedComment = await commentDAO.deleteOne({ id });
    return deletedComment;
  },
};

module.exports = commentService;
