const { postService } = require("../service");
const { Post } = require("../data-access/models");
const util = require("../misc/util");

const postController = {
  async postPost(req, res, next) {
    try {
      /** 추후 session으로부터 userId 받아오는 로직으로 변경 필요. */
      const userId = 1;

      const { categoryId, title, content, summary } = req.body;

      const postDto = {
        userId,
        categoryId,
        title,
        content,
        summary,
      };
      const newPost = await postService.createPost(postDto);
      res.status(201).json(util.buildResponse(newPost));
    } catch (error) {
      next(error);
    }
  },

  async getPostsByCategory(req, res, next) {
    /** 추후 session으로부터 userId 받아오는 로직으로 변경 필요. */
    const userId = 1;
    try {
      const { id } = req.params;
      const posts = await postService.getPostsByCategory(userId, id);
      res.json(util.buildResponse(posts));
    } catch (error) {
      next(error);
    }
  },

  async getPost(req, res, next) {
    try {
      const { id } = req.params;
      const post = await postService.getPost(id);
      res.json(util.buildResponse(post));
    } catch (error) {
      next(error);
    }
  },

  async putPost(req, res, next) {
    try {
      const { id } = req.params;

      const { categoryId, title, content, summary } = req.body;

      const postDto = {
        categoryId,
        title,
        content,
        summary,
      };
      const updatedPost = await postService.updatePost(id, postDto);
      res.json(util.buildResponse(updatedPost));
    } catch (error) {
      next(error);
    }
  },

  async deletePost(req, res, next) {
    try {
      const { id } = req.params;
      const post = await postService.deletePost(id);
      res.json(util.buildResponse(post));
    } catch (error) {
      next(error);
    }
  },
};

module.exports = postController;
