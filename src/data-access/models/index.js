const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../../config/mysql")[env];
const User = require("./User");

const db = {};
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.User = User;

User.init(sequelize);

// User.associate(db);

module.exports = db;
