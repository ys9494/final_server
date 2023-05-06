const { commentService } = require("../service");
const { Comment } = require("../data-access/models");
const util = require("../misc/util");

const commentController = {
  async postComment(req, res, next) {
    /** 추후 session으로부터 userId 받아오는 로직으로 변경 필요. */
    const userId = 1;
    try {
      const { postId } = req.params;
      const { content } = req.body;
      const commentDto = {
        userId,
        postId,
        content,
      };
      const newComment = await commentService.createComment(commentDto);
      res.status(201).json(util.buildResponse(newComment));
    } catch (error) {
      next(error);
    }
  },

  async putComment(req, res, next) {
    /** 추후 session으로부터 userId 받아오는 로직으로 변경 필요. */
    const userId = 1;

    try {
      const { id } = req.params;
      const { content } = req.body;

      const commentDto = {
        content,
      };
      const updatedCategory = await commentService.updateComment(
        id,
        commentDto
      );
      // res.json(util.buildResponse(updatedCategory));
      res.json(updatedCategory);
    } catch (error) {
      next(error);
    }
  },

  async deleteComment(req, res, next) {
    /** 추후 session으로부터 userId 받아오는 로직으로 변경 필요. */
    const userId = 1;

    try {
      const { id } = req.params;
      const deletedComment = await commentService.deleteComment({ id });
      res.json(util.buildResponse(deletedComment));
    } catch (error) {
      next(error);
    }
  },
};

module.exports = commentController;
