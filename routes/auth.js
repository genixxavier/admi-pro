const {Router} = require('express')
const router = Router();
const { check } = require('express-validator')
const { validFields } = require('../middlewares/validate-flieds')

const {login} = require('../controllers/auth')

router.post("/", [check('email', 'Email is required').isEmail(), check('password', 'Password is required').not().isEmpty(), validFields], login)

module.exports = router;