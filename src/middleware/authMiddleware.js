const Joi = require("joi");
const AppError = require("../misc/AppError");
const commonErrors = require("../misc/commonErrors");
const firebaseAdmin = require("../config");

// 이메일
const emailPattern =
  "^[0-9a-zA-Z]([-_]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_]?[0-9a-zA-Z])*[.][a-z]{2,3}$";

// 로그인 스키마
const loginSchema = Joi.object().keys({
  email: Joi.string().pattern(new RegExp(emailPattern)).required().messages({
    "string.base": "Email은 문자열이어야 합니다.",
    "any.required": "Email을 입력해주세요.",
    "string.pattern.base": "Email이 형식에 맞지 않습니다.",
  }),
});

// 로그인 유효성 검사
const checkLoginFrom = async (req, res, next) => {
  const { email } = req.body;

  try {
    await loginSchema.validateAsync({
      email,
    });
    next();
  } catch (error) {
    next(new AppError(commonErrors.inputError, 400, `${error}`));
  }
};

// Firebase ID 토큰 검증 미들웨어
const verifyIdToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new AppError(commonErrors.authError, 401, "토큰이 없습니다."));
  }

  const idToken = authHeader.split("Bearer ")[1];

  try {
    const decodedToken = await firebaseAdmin.auth.verifyIdToken(idToken);
    req.uid = decodedToken.uid;
    next();
  } catch (error) {
    return next(
      new AppError(commonErrors.authError, 401, "토큰이 유효하지 않습니다.")
    );
  }
};

module.exports = {
  checkLoginFrom,
  verifyIdToken,
};
