const {Router} = require('express')
const router = Router();

const {getSeraches, getSearchCollections} = require('../controllers/searches');
const { validateKWT } = require('../middlewares/validate-jwt');

router.get("/:words",validateKWT, getSeraches)
router.get("/collection/:table/:words",validateKWT, getSearchCollections)


module.exports = router;