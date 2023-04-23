const Sequelize = require("sequelize");
const User = require("./user");
const Post = require("./post");

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

Object.keys(db).forEach((modelName) => {
  console.log('err', config)
  db[modelName].init(sequelize);
});

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});


db.sequelize = sequelize;
db.Sequelize = Sequelize;

// User.init(sequelize);
// Post.init(sequelize);

// User.associate(db);
// Post.associate(db);

module.exports = db;
