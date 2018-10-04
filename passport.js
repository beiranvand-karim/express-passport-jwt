
const passport = require('passport');
const jwtStrategy = require('passport-jwt').Strategy;
const {ExtractJwt} = require('passport-jwt');
const {JWT_secret} = require('./configurations');
const User = require('./models/user');
const localStrategy = require('passport-local').Strategy;

passport.use(new jwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: JWT_secret
}, async (payload, done) => {
    try {

        const user = await User.findById(payload.sub);
        if (!user) {
            return done(null, false);
        }

        done(null, user);

    } catch (e) {
        done(e, false);
    }
}));

passport.use(new localStrategy({
    usernameField: 'email'
}, async (email, password, done) => {

    try {

        const user = await User.findOne({email});
        if (!user) {
            return done(null, false);
        }

        const isMatch = await user.isValidPassword(password);

        if (!isMatch) {
            return done(null, false)
        }
        done(null, user)
    }catch (e) {
        done(e, false)
    }

}));