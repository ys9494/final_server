const AppError = require("../misc/AppError");
const commonErrors = require("../misc/commonErrors");
const Joi = require("joi");

// 닉네임은 최소 2자 최대 10자, 한글, 알파벳 대소문자 (a~z, A~Z), 숫자(0~9)로 구성
const nicknamePattern = "^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9]{2,10}$";

// 회원가입 스키마
const joinSchema = Joi.object().keys({
  nickname: Joi.string()
    .pattern(new RegExp(nicknamePattern))
    .required()
    .messages({
      "string.base": "닉네임은 문자열이어야 합니다.",
      "any.required": "닉네임을 입력해주세요.",
      "string.pattern.base": "닉네임이 형식에 맞지 않습니다.",
    }),
});

// 회원가입 유효성 검사
const checkJoinFrom = (req, res, next) => {
  console.log("checkJoinFrom middleware 시작"); // 로그 추가

  const { nickname } = req.body;

  try {
    const result = joinSchema.validate({ nickname });
    if (result.error) {
      throw result.error;
    }
    console.log("checkJoinFrom middleware 완료"); // 로그 추가
    next();
  } catch (error) {
    next(new AppError(commonErrors.inputError, 400, `${error}`));
  }
};

// params에 id 값 유무 검사
const checkUserIdFrom = () => (req, res, next) => {
  const { uid } = req.params;
  if (uid === ":uid") {
    next(
      new AppError(commonErrors.inputError, 400, `${from}: uid는 필수값입니다.`)
    );
    return;
  }
  next();
};

module.exports = {
  checkJoinFrom,
  checkUserIdFrom,
};
