const { postService, commentService } = require("../service");
const { Post } = require("../data-access/models");
const util = require("../misc/util");

const postController = {
  async postPost(req, res, next) {
    try {
      /** 추후 userId 받아오는 로직으로 변경 필요. */
      const userId = "t1oQfUpQnDWiAwgFtGPX8AZcPR82";

      const { categoryId, title, content, summary } = req.body;

      const postDTO = {
        UserId: userId,
        CategoryId: categoryId,
        title,
        content,
        summary,
      };
      const newPost = await postService.createPost(postDTO);
      res.status(201).json(util.buildResponse(newPost));
    } catch (error) {
      next(error);
    }
  },

  async getPostsByCategory(req, res, next) {
    /** 추후 userId 받아오는 로직으로 변경 필요. */
    const userId = "t1oQfUpQnDWiAwgFtGPX8AZcPR82";
    try {
      const { categoryId } = req.params;
      const posts = await postService.getPostsByCategory(userId, categoryId);
      res.json(util.buildResponse(posts));
    } catch (error) {
      next(error);
    }
  },

  async getPost(req, res, next) {
    try {
      const { postId } = req.params;
      const post = await postService.getPost(postId);
      if (!post) {
        return res.status(404).send("게시글이 존재하지 않습니다.");
      }

      // 조회수 증가
      post.views++;
      await post.save();
      res.json(util.buildResponse(post));
    } catch (error) {
      next(error);
    }
  },

  async patchPost(req, res, next) {
    /** 추후 userId 받아오는 로직으로 변경 필요. */
    const userId = "t1oQfUpQnDWiAwgFtGPX8AZcPR82";

    try {
      const { postId } = req.params;

      const { categoryId, title, content, summary } = req.body;

      const postDTO = {
        CategoryId: categoryId,
        title,
        content,
        summary,
      };
      const updatedPost = await postService.updatePost(postId, postDTO);
      res.json(util.buildResponse(updatedPost));
    } catch (error) {
      next(error);
    }
  },

  async deletePost(req, res, next) {
    /** 추후 userId 받아오는 로직으로 변경 필요. */
    const userId = "t1oQfUpQnDWiAwgFtGPX8AZcPR82";

    try {
      const { postId } = req.params;
      const post = await postService.deletePost(postId);
      // const comment = await commentService.deleteComment({ postId });
      res.json(util.buildResponse(post));
    } catch (error) {
      next(error);
    }
  },

  async patchLike(req, res, next) {
    /** 추후 userId 받아오는 로직으로 변경 필요. */
    const userId = "t1oQfUpQnDWiAwgFtGPX8AZcPR82";

    try {
      const { postId } = req.params;
      const updatedLike = await postService.updateLike(postId, userId);
      res.json(util.buildResponse(updatedLike));
    } catch (error) {
      next(error);
    }
  },

  async deleteLike(req, res, next) {
    /** 추후 userId 받아오는 로직으로 변경 필요. */
    const userId = "t1oQfUpQnDWiAwgFtGPX8AZcPR82";

    try {
      const { postId } = req.params;
      const updatedLike = await postService.deleteLike(postId, userId);
      res.json(util.buildResponse(updatedLike));
    } catch (error) {
      next(error);
    }
  },
};

module.exports = postController;
