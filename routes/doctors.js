const {Router} = require('express')
const router = Router();
const { check } = require('express-validator')
const { validFields } = require('../middlewares/validate-flieds')

const {getDoctors, createDoctor, updateDoctor, deleteDoctor} = require('../controllers/doctors');
const { validateKWT } = require('../middlewares/validate-jwt');

router.get("/",validateKWT, getDoctors)

router.post("/", [
    validateKWT,
    check('name','Required name').not().isEmpty(),
    check('hospital','Required hospital').not().isEmpty(),
    check('hospital','Id hospital isn\'t valid').isMongoId(),
    validFields
], createDoctor)

router.put("/:id", [
    validateKWT,
    check('name','Required name').not().isEmpty(),
    check('hospital','Required hospital').not().isEmpty(),
    check('hospital','Id hospital isn\'t valid').isMongoId(),
    validFields
],updateDoctor)


router.delete("/:id", validateKWT,deleteDoctor) 

module.exports = router;