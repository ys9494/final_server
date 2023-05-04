const Sequelize = require("sequelize");
const User = require("./user");
const Post = require("./post");
const Category = require("./category");
const Comment = require("./comment");
const Like = require("./like");

const env = process.env.NODE_ENV || "development";
const config = require("../../config/mysql")[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.User = User;
db.Post = Post;
db.Category = Category;
db.Comment = Comment;
db.Like = Like;

Object.keys(db).forEach((modelName) => {
  db[modelName].init(sequelize);
});

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
