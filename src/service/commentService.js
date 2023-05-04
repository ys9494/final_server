const { Comment, Post, User } = require("../data-access/models");

const commentService = {
  async createComment(commentDto) {
    const createdComment = await Comment.create(commentDto);
    return createdComment;
  },

  async updateComment(id, commentDto) {
    const updatedComment = await Comment.update(commentDto, {
      where: {
        id,
      },
      returning: true,
    });
    return updatedComment;
  },

  async deleteComment(commentDto) {
    const deletedComment = await Comment.destroy({
      where: commentDto,
    });

    return deletedComment;
  },
};

module.exports = commentService;
