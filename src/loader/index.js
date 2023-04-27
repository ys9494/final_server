const { sequelize } = require("../data-access/models");

async function connectMysqlDB() {
  sequelize
    .sync({ force: false })
    .then(() => {
      console.log("🗄 Database connection success!");
    })
    .catch((err) => {
      console.error("🗄 Database connection Error! " + err);
    });
}

async function disconnectMysqlDB() {
  try {
    await sequelize.close();
    console.log("🗄 Database connection closed successfully!");
  } catch (err) {
    console.error("🗄 Database close Error! " + err);
  }
}

module.exports = {
  connectMysqlDB,
  disconnectMysqlDB,
};
