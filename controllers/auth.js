const { response, json } = require('express')
const Usuario = require('../models/user');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');


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


module.exports = {
    login
}