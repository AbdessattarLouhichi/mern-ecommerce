import passport from 'passport';
import { Strategy } from 'passport-http-bearer';
import User from "../models/user.js"
import jwt  from "jsonwebtoken";



passport.use(new Strategy(
  (token, done) => {
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    //console.log(decoded)
    User.findById(decoded.userId, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      return done(null, user);
    });
  }
));