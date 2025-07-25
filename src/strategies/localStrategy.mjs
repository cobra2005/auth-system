import passport from "passport";
import { Strategy } from "passport-local";
import User from "../models/User.mjs";
import { comparePassword } from "../utils/hash.mjs";

passport.serializeUser((user, done) => {
    try {
        done(null, user._id);
    } catch (err) {
        done(err, null);
    }
});

passport.deserializeUser(async (id, done) => {
    try {
        const findUser = await User.findById(id).select('-passwordHash -__v');
        if(!findUser) throw new Error('User not found');
        done(null, findUser);
    } catch (err) {
        done(err, null)
    }
})

passport.use(new Strategy(async (username, password, done) => {
    try {
        const findUser = await User.findOne({ username });
        if(!findUser) throw new Error('User not found');
        const isMatched = await comparePassword(password, findUser.passwordHash);
        if(!isMatched) throw new Error('Password is incorrect');
        const userResponse = findUser.toObject();
        delete userResponse.passwordHash;
        done(null, userResponse);
    } catch (err) {
        done(err, null);
    }
}))