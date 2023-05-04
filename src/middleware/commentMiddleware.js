const AppError = require("../misc/AppError");
const commonErrors = require("../misc/commonErrors");
const { Comment } = require("../data-access/models");

const checkNonExistCommentFrom = (from) => async (req, res, next) => {
  const { id } = req[from];

  if (id === undefined) {
    next();
  }

  const existComment = await Comment.findOne({
    where: {
      id,
    },
  });

  if (existComment === null) {
    next(
      new AppError(
        commonErrors.resourceNotFoundError,
        400,
        `존재하지 않는 댓글입니다.`
      )
    );
  }

  next();
};

const checkCompleteCommentFrom = (from) => (req, res, next) => {
  const { content } = req[from];
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

const checkCommentIdFrom = (from) => (req, res, next) => {
  const { id } = req[from];

  if (id === undefined) {
    next(
      new AppError(commonErrors.inputError, 400, `${from}: id는 필수값입니다.`)
    );
  }
  next();
};

module.exports = {
  checkNonExistCommentFrom,
  checkCompleteCommentFrom,
  checkCommentIdFrom,
};
