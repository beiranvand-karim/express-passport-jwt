
const router = require('express-promise-router')();
const {validateBody, schemas} = require('../helpers/routeHelpers');
const usersController = require('../controllers/users');
const passport = require('passport');
const passportConf = require('../passport');


const passportLogIn = passport.authenticate('local', {session: false});
const passportJWT = passport.authenticate('jwt', {session: false});

router.route('/signup')
    // email and password
    .post(validateBody(schemas.authSchema), usersController.signUp);

router.route('/signin')
    // generate token
    .post(validateBody(schemas.authSchema), passportLogIn, usersController.signIn);

router.route('/secret')
    .get(passportJWT, usersController.secret);

module.exports = router;