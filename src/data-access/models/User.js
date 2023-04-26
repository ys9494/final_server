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
        password: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        blogName: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        bio: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        admin: {
          type: Sequelize.STRING(1),
          allowNull: false,
        },
        userType: {
          type: Sequelize.STRING(20),
          allowNull: false,
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
  static associate(db) {
    db.User.hasMany(db.Post, {
      foreignKey: "author",
      sourceKey: "id",
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  }
};
