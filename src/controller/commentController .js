const { commentService } = require("../service");
const { Comment } = require("../data-access/models");
const util = require("../misc/util");

const commentController = {
  async postComment(req, res, next) {
    /** 추후 userId 받아오는 로직으로 변경 필요. */
    const userId = 1;
    try {
      const { postId } = req.params;
      const { content } = req.body;
      const commentDTO = {
        UserId: userId,
        PostId: postId,
        content,
      };
      const newComment = await commentService.createComment(commentDTO);
      res.status(201).json(util.buildResponse(newComment));
    } catch (error) {
      next(error);
    }
  },

  async patchComment(req, res, next) {
    /** 추후 userId 받아오는 로직으로 변경 필요. */
    const userId = 1;

    try {
      const { commentId } = req.params;
      const { content } = req.body;

      const commentDTO = {
        content,
      };
      const updatedCategory = await commentService.updateComment(
        commentId,
        commentDTO
      );
      // res.json(util.buildResponse(updatedCategory));
      res.json(util.buildResponse(updatedCategory));
    } catch (error) {
      next(error);
    }
  },

  async deleteComment(req, res, next) {
    /** 추후 userId 받아오는 로직으로 변경 필요. */
    const userId = 1;

    try {
      const { commentId } = req.params;
      const deletedComment = await commentService.deleteComment(commentId);
      res.json(util.buildResponse(deletedComment));
    } catch (error) {
      next(error);
    }
  },
};

module.exports = commentController;
