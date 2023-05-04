const Sequelize = require("sequelize");

module.exports = class Like extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        postId: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: true,
        modelName: "Like",
        tableName: "likes",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.Like.belongsTo(db.User);
    db.Like.belongsTo(db.Post);
  }
};
