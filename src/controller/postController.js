const { postService } = require("../service");
const { Post } = require("../models");
const util = require("../misc/util");

const postController = {
  async postPost(req, res, next) {
    try {
      /** 추후 session으로부터 userId 받아오는 로직으로 변경 필요. */
      const userId = 1;

      const { category, title, content, summary } = req.body;
      const postDto = {
        userId,
        category,
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

  async getCategory(req, res, next) {
    /** 추후 session으로부터 userId 받아오는 로직으로 변경 필요. */
    const userId = 1;
    try {
      const categories = await postService.getCategory(userId);
      const posts = { post: "post" };

      const result = {};
      result.categories = categories;
      result.posts = posts;

      res.json(util.buildResponse(result));
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
  async getPosts(req, res, next) {
    try {
      const { title, author } = req.query;
      const posts = await postService.getPosts({ title, author });
      res.json(util.buildResponse(posts));
    } catch (error) {
      next(error);
    }
  },
  async putPost(req, res, next) {
    try {
      const { id } = req.params;
      const { title, content, author } = req.body;
      const post = await postService.updatePost(id, { title, content, author });
      res.json(util.buildResponse(post));
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
  async deletePosts(req, res, next) {
    try {
      const { title, author } = req.body;
      const posts = await postService.deletePosts({ title, author });
      res.json(util.buildResponse(posts));
    } catch (error) {
      next(error);
    }
  },
};

module.exports = postController;
