const AppError = require("../misc/AppError");
const commonErrors = require("../misc/commonErrors");
const { Category } = require("../data-access/models");

const checkExistCategoryFrom = (from) => async (req, res, next) => {
  const { name } = req[from];
  const existCategory = await Category.findOne({
    where: {
      name,
    },
  });
  console.log("cat", existCategory);

  if (existCategory) {
    next(
      new AppError(
        commonErrors.resourceDuplicationError,
        409,
        `이미 존재하는 카테고리입니다.`
      )
    );
  }

  next();
};

const checkCompleteCategoryFrom = (from) => (req, res, next) => {
  const { name } = req[from];
  if (name === undefined) {
    next(
      new AppError(
        commonErrors.inputError,
        400,
        `${from}: name은 필수값입니다.`
      )
    );
  }
  next();
};

module.exports = {
  checkExistCategoryFrom,
  checkCompleteCategoryFrom,
};
