const {Router} = require('express')
const router = Router();
const { check } = require('express-validator')
const { validFields } = require('../middlewares/validate-flieds')

const {getHospitals, createHospital, updateHospital, deleteHospital} = require('../controllers/hospitals');
const { validateKWT } = require('../middlewares/validate-jwt');

router.get("/",validateKWT, getHospitals)

router.post("/", [
    validateKWT, 
    check('name', 'The name hospital is required').not().isEmpty(),
    validFields
], createHospital)

router.put("/:id", [
    validateKWT,
    check('name', 'The name hospital is required').not().isEmpty(),
    validFields
],updateHospital)


router.delete("/:id", validateKWT,deleteHospital)

module.exports = router;