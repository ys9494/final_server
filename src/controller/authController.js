const { getAuth, initPromise } = require("../config").firebase;

const authController = {
  // Firebase 로그인
  loginUser: async (req, res, next) => {
    const email = req.email;
    const idToken = req.idToken;
    const firebaseAuth = getAuth();

    try {
      await initPromise;
      const userRecord = await firebaseAuth.getUserByEmail(email); // Firebase에서 이메일로 사용자 정보를 가져옵니다.

      if (!userRecord) {
        return res.status(401).json({ message: "회원을 찾을 수 없습니다." });
      }

      const user = {
        email: userRecord.email,
      };

      res.cookie("accessToken", idToken, { httpOnly: true });
      return res.json({ success: "로그인 성공", user });
    } catch (error) {
      next(error);
    }
  },

  // 로그아웃
  logoutUser: (req, res) => {
    res.clearCookie("accessToken");
    res.json({ message: "로그아웃 성공" });
  },
};

module.exports = authController;
