const checkUserIdFrom = (source) => {
  return (req, res, next) => {
    const { uid } = req[source];

    if (uid !== req.uid) {
      // req 객체에서 저장된 uid와 일치하는지 확인합니다.
      return res.status(403).json({ message: "일치하는 회원이 없습니다." });
    }

    next();
  };
};

module.exports = {
  // 다른 미들웨어 export 코드는 생략됨
  checkUserIdFrom,
};
