const {Router} = require('express')
const router = Router();
const { check } = require('express-validator')
const { validFields } = require('../middlewares/validate-flieds')

const {login, googleSignIn} = require('../controllers/auth')

router.post("/", [check('email', 'Email is required').isEmail(), check('password', 'Password is required').not().isEmpty(), validFields], login)
router.post("/google", [check('token', 'Token is required').not().isEmpty(), validFields], googleSignIn)

module.exports = router;