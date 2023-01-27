const {Router} = require('express')
const router = Router();
const { check } = require('express-validator')
const { validFields } = require('../middlewares/validate-flieds')

const {getUsers, createUser, updateUser, deleteUser} = require('../controllers/user');
const { validateKWT } = require('../middlewares/validate-jwt');

router.get("/",validateKWT, getUsers)

router.post("/", [
    check('name', 'name is required').not().isEmpty(),
    check('password', 'password is required').not().isEmpty(),
    check('email', 'email not valid').isEmail(),
    validFields,
], createUser)

router.put("/:id", [
    validateKWT,
    check('name', 'name is required').not().isEmpty(),
    check('role', 'rol is required').not().isEmpty(),
    check('email', 'email not valid').isEmail(),
    validFields
],updateUser)


router.delete("/:id", validateKWT,deleteUser)

module.exports = router;