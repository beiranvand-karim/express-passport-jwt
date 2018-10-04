const User =require('../models/user');
const JWT = require('jsonwebtoken');

const {JWT_secret} = require('../configurations');

signToken = (user) => {
    return JWT.sign({
        iss: 'codeworkr',
        sub: user.id,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1)
    }, JWT_secret);
};


module.exports = {
    signUp: async (req, resp, next) => {
        const {password, email} = req.value.body;

        const foundUser = await User.findOne({email});
        if(foundUser) {
            return resp.status(403).json({error: 'email is already in user'});
        }
        const newUser = new User({ password, email });
        await newUser.save();

        const token = signToken(newUser);

        resp.status(200).json({token});
    },
    signIn: async (req, resp, next) => {
        const token = signToken(req.user);
        resp.status(200).json({token});
    },
    secret: async (req, resp, next) => {
        console.log('i managed to get here');
        resp.json({secret: 'resource'})
    }
};