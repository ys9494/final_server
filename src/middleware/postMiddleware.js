const AppError = require("../misc/AppError");
const commonErrors = require("../misc/commonErrors");
const { Post } = require("../data-access/models");

const checkCompletePostFrom = (from) => (req, res, next) => {
  const { title, content } = req[from];
  if (title === undefined) {
    next(
      new AppError(
        commonErrors.inputError,
        400,
        `${from}: title은 필수값입니다.`
      )
    );
  }
  if (content === undefined) {
    next(
      new AppError(
        commonErrors.inputError,
        400,
        `${from}: content는 필수값입니다.`
      )
    );
  }
  next();
};

const checkPostIdFrom = (from) => (req, res, next) => {
  const { id } = req[from];
  if (id === undefined) {
    next(
      new AppError(commonErrors.inputError, 400, `${from}: id는 필수값입니다.`)
    );
  }
  next();
};

const checkMinPostConditionFrom = (from) => (req, res, next) => {
  const { title, content, categoryId, summary } = req[from];
  if (
    title === undefined &&
    content === undefined &&
    categoryId === undefined &&
    summary === undefined
  ) {
    next(
      new AppError(
        commonErrors.inputError,
        400,
        `${from}: title, content, categoryId, summary 최소 하나는 필요합니다.`
      )
    );
  }
  next();
};

const checkNonExistPostFrom = (from) => async (req, res, next) => {
  const { id } = req[from];
  const { postId } = req[from];

  console.log("게시글 id", id);

  if (id === undefined) {
    next();
  }

  const existPost = await Post.findOne({
    where: {
      id: id ? id : postId,
    },
  });

  if (existPost === null) {
    next(
      new AppError(
        commonErrors.resourceNotFoundError,
        400,
        `존재하지 않는 게시글입니다.`
      )
    );
  }

  next();
};

module.exports = {
  checkCompletePostFrom,
  checkPostIdFrom,
  checkMinPostConditionFrom,
  checkNonExistPostFrom,
};
