const { auth, initPromise } = require("../config").firebase;

const authController = {
  // Firebase 로그인
  loginUser: async (req, res, next) => {
    const idToken = req.body.idToken;
    console.log("firebaseAdmin:", auth);
    console.log(req.body);

    try {
      await initPromise;
      const decodedToken = await auth.verifyIdToken(idToken);
      const uid = decodedToken.uid;
      const userRecord = await auth.getUser(uid);

      if (!userRecord) {
        return res.status(401).json({ message: "회원을 찾을 수 없습니다." });
      }

      const user = {
        uid: userRecord.uid,
        email: userRecord.email,
        nickname: userRecord.displayName,
      };

      res.cookie("accessToken", idToken, { httpOnly: true });
      return res.json({ message: "로그인 성공", user });
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
