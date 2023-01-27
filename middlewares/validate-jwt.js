const jwt = require('jsonwebtoken')

const validateKWT = (req, res, next) => {
    const token = req.header('x-token')

    if(!token){
        return res.status(401).json({
            ok: false,
            msg: 'Requied token'
        })
    }

    try {
        const {uid} = jwt.verify(token, process.env.JWT_SECRET)
        req.uid = uid
        next()
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token invalid'
        })
    }
}

module.exports = {
    validateKWT
}