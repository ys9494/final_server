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
  await sequelize.close();
}

module.exports = {
  connectMysqlDB,
  disconnectMysqlDB,
};
