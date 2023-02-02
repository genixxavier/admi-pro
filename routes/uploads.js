const {Router} = require('express')
const fileUpload = require('express-fileupload');
const router = Router();

const { uploadFiles, getFile } = require('../controllers/uploads');
const { validateKWT } = require('../middlewares/validate-jwt');

router.use(fileUpload());
router.put("/:model/:id",validateKWT, uploadFiles)

router.get("/:model/:image",validateKWT, getFile)


module.exports = router;