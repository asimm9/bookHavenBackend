const passport = require("passport");
const { ExtractJwt, Strategy } = require("passport-jwt");
const config = require("../config");
const Users = require("../db/models/Users");
const CustomError = require("./CustomError");
const Enum = require("../config/Enum");

module.exports = function () {
  let strategy = new Strategy(
    {
      secretOrKey: config.JWT.SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async (payload, done) => {
      try {
        let user = await Users.findOne({ _id: payload.id });

        if (user) {
          done(null, {
            id: user._id,
            username: user.username,
            email: user.email,
            profileImage: user.profileImage,
            biography: user.biography,
            favoriteAuthors: user.favoriteAuthors,
            readingLists: user.readingLists,
            exp: parseInt(Date.now() / 1000) * config.JWT.EXPIRE_TIME,
          });
        } else {
          done(
            new CustomError(
              Enum.HTTP_CODES.BAD_REQUEST,
              "Jwt Error",
              "User not found"
            ),
            null
          );
        }
      } catch (error) {
        done(error, null);
      }
    }
  );

  passport.use(strategy);

  return{
    initialize :function () {
        return passport.initialize();
    },
    authenticate: function () {
        return passport.authenticate("jwt",{session:false});
    }
  }
};
