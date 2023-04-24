const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const admin = require("firebase-admin");

require("dotenv").config();

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const userRecord = await admin.auth().getUser(jwt_payload.uid);

      if (!userRecord) {
        throw new Error("회원을 찾을 수 없습니다.");
      }

      const user = {
        id: userRecord.uid,
        email: userRecord.email,
        nickname: userRecord.displayName,
        blogName: "",
        bio: "",
        admin: jwt_payload.userType === "admin" ? "Y" : "N",
      };

      done(null, user);
    } catch (error) {
      done(error, null);
    }
  })
);

module.exports = passport;
