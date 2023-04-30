const Sequelize = require("sequelize");

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        nickname: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        blogName: {
          type: Sequelize.STRING(100),
          allowNull: false,
          defaultValue: Sequelize.literal("CONCAT(nickname, '의 블로그')"),
        },
        bio: {
          type: Sequelize.STRING(100),
          allowNull: false,
          defaultValue: Sequelize.literal("CONCAT(nickname, '의 공간입니다')"),
        },
        admin: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: true,
        modelName: "User",
        tableName: "users",
        paranoid: true,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }
};
