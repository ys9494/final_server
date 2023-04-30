const postMiddleware = require("./postMiddleware");
const categoryMiddleware = require("./categoryMiddleware");
const authMiddleware = require("./authMiddleware");
const userMiddleware = require("./userMiddleware");

module.exports = {
  postMiddleware,
  categoryMiddleware,
  userMiddleware,
  authMiddleware,
};
