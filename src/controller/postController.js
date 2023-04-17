const { postService } = require("../service");
const util = require("../misc/util");

const postController = {
  async postPost(req, res, next) {
    try {
      const { title, content, author } = req.body;
      const post = await postService.createPost({ title, content, author });
      res.status(201).json(util.buildResponse(post));
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
