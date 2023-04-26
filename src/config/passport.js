const passport = require("passport");
const FirebaseStrategy = require("passport-firebase-jwt").Strategy;
const firebaseAdmin = require("../config/firebase");

const opts = {
  credential: firebaseAdmin.credential, // 여기를 업데이트했습니다.
};

passport.use(
  new FirebaseStrategy(opts, async (token, done) => {
    try {
      const userRecord = await firebaseAdmin.auth().getUser(token.uid);

      if (!userRecord) {
        throw new Error("회원을 찾을 수 없습니다.");
      }

      const user = {
        id: userRecord.uid,
        email: userRecord.email,
        nickname: userRecord.displayName,
        blogName: "",
        bio: "",
        admin: false, // firebase에서 직접 admin 정보를 가져올 수 없기 때문에 임시로 false 설정
      };

      done(null, user);
    } catch (error) {
      done(error, null);
    }
  })
);

module.exports = passport;
