const {Router} = require('express')
const router = Router();
const { check } = require('express-validator')
const { validFields } = require('../middlewares/validate-flieds')

const {login, googleSignIn, newToken} = require('../controllers/auth');
const { validateKWT } = require('../middlewares/validate-jwt');

router.post("/", [check('email', 'Email is required').isEmail(), check('password', 'Password is required').not().isEmpty(), validFields], login)
router.post("/google", [check('token', 'Token is required').not().isEmpty(), validFields], googleSignIn)
router.get("/new-token", validateKWT, newToken)

module.exports = router;