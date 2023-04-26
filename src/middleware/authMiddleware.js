const Joi = require("joi");
const AppError = require("../misc/AppError");
const commonErrors = require("../misc/commonErrors");
const firebaseAdmin = require("../config");

// 이메일
const emailPattern =
  "^[0-9a-zA-Z]([-_]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_]?[0-9a-zA-Z])*[.][a-z]{2,3}$";
// 비밀번호는 최소 8자, 최소 하나의 문자, 하나의 숫자, 하나의 특수문자로 구성
const passwordPattern =
  "^(?=.*?[0-9])(?=.*?[#?!@$ %^&*-])(?=.*?[A-Za-z]).{8,}$";

// 로그인 스키마
const loginSchema = Joi.object().keys({
  email: Joi.string().pattern(new RegExp(emailPattern)).required().messages({
    "string.base": "Email은 문자열이어야 합니다.",
    "any.required": "Email을 입력해주세요.",
    "string.pattern.base": "Email이 형식에 맞지 않습니다.",
  }),
  password: Joi.string()
    .pattern(new RegExp(passwordPattern))
    .required()
    .messages({
      "string.base": "비밀번호는 문자열이어야 합니다.",
      "any.required": "비밀번호를 입력해주세요.",
      "string.pattern.base": "비밀번호가 형식에 맞지 않습니다.",
    }),
});

// 로그인 유효성 검사
const checkLoginFrom = (from) => async (req, res, next) => {
  const { email, password } = req[from];

  try {
    await loginSchema.validateAsync({
      email,
      password,
    });
    next();
  } catch (error) {
    next(new AppError(commonErrors.inputError, 400, `${error}`));
  }
};

// Firebase ID 토큰 검증 미들웨어
const verifyIdToken = async (req, res, next) => {
  const idToken = req.headers.authorization;

  if (!idToken) {
    return next(new AppError(commonErrors.authError, 401, "토큰이 없습니다."));
  }

  try {
    const decodedToken = await firebaseAdmin.auth().verifyIdToken(idToken);
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
