import { secretKey } from "./config";
import { User } from "../models/user.model";
import passport from "passport";
import { Strategy as JwtStrategy } from "passport-jwt";


// Function to extract token from cookies
const extractJwtFromCookies = (req) => {
    return req.cookies.accessToken;
};

var opts = {
    jwtFromRequest: extractJwtFromCookies,
    secretKey
}

export default passport.use(new JwtStrategy(opts, async function (jwt_payload, done) {
    try {
        const user = await User.findById(jwt_payload._id)

        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch (error) {
        console.log(error)
        return done (error,false)
    }
}));