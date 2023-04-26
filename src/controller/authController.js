const passport = require("passport");

const authController = {
  // Firebase 로그인
  loginFirebaseUser: (req, res, next) => {
    passport.authenticate("firebase", (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json({ message: info.message });
      }

      req.login(user, (err) => {
        if (err) {
          return next(err);
        }
        res.cookie("accessToken", user.token, { httpOnly: true });
        return res.json({ message: "Firebase 로그인 성공", user });
      });
    })(req, res, next);
  },

  // 로컬 로그인
  loginLocalUser: (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json({ message: info.message });
      }

      req.login(user, (err) => {
        if (err) {
          return next(err);
        }
        const token = util.generateToken(user);
        res.cookie("accessToken", token, { httpOnly: true });
        return res.json({ message: "로그인 성공", user });
      });
    })(req, res, next);
  },

  // 로그아웃
  logoutUser: (req, res) => {
    req.logout();
    res.clearCookie("accessToken");
    res.json({ message: "로그아웃 성공" });
  },
};

module.exports = authController;
