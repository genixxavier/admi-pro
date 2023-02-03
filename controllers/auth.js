const Usuario = require('../models/user');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/verify-google');


const login = async(req, res)=>{
    const {email, password} = req.body
    try {
        const user = await Usuario.findOne({email});
        if(!user){
            return res.status(404).json({
                ok: false,
                msg: 'Validate fields'
            })
        }

        const validPassword = bcrypt.compareSync(password, user.password)
        if(!validPassword){
            return res.status(404).json({
                ok: false,
                msg: 'Validate fields password'
            })
        }

        //generate token
        const token = await generateJWT(user.id)

        res.status(200).json({
            ok: true,
            msg: token
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'faild login'
        })
    }
}


const googleSignIn = async(req, res)=>{
    const getToken = req.body.token || '';
    try {
        const { email, name, picture} = await googleVerify(getToken);
        const userDB = await Usuario.findOne({email})
        let user

        if(!user){
            user = new Usuario({
                name,
                email,
                password: '@@@',
                image: picture,
                google: true
            })
        } else {
            user = userDB
            user.google = true
        }

        await user.save()
        //generate token
        const token = await generateJWT(user.id)

        res.status(200).json({
            ok: true,
            email,
            name, 
            picture,
            token
        });
    
    } catch (error) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Token no válido',
            errors: error
        });
    }
}


module.exports = {
    login,
    googleSignIn
}