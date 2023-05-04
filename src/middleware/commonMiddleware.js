const AppError = require("../misc/AppError");
const commonErrors = require("../misc/commonErrors");
const { Post, Category, Comment } = require("../data-access/models");

const checkIdFrom = (from, checkId) => (req, res, next) => {
  const id = req[from][checkId];
  if (id === undefined) {
    next(
      new AppError(commonErrors.inputError, 400, `${from}: id는 필수값입니다.`)
    );
  }
  next();
};

const checkNonExistenceFrom =
  (from, checkId, table) => async (req, res, next) => {
    const id = req[from][checkId];

    console.log("check id", id);

    const tableObj = {
      ["게시글"]: Post,
      ["카테고리"]: Category,
      ["댓글"]: Comment,
    };

    if (id === undefined) {
      next();
    }

    const existPost = await tableObj[table].findOne({
      where: {
        id,
      },
    });

    if (existPost === null) {
      next(
        new AppError(
          commonErrors.resourceNotFoundError,
          400,
          `존재하지 않는 ${table}입니다.`
        )
      );
    }

    next();
  };

module.exports = {
  checkIdFrom,
  checkNonExistenceFrom,
};
