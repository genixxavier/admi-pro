const { response } = require('express')
const Usuario = require('../models/user');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');


const getUsers = async(req, res)=>{
    const users = await Usuario.find({}, 'name email role google');
    res.status(200).json({
        ok: true,
        users,
    })
}

const createUser = async(req, res= response)=>{
    const {email, password} = req.body;

    try {
        const emailExists = await Usuario.findOne({email});
        if(emailExists){
            return res.status(400).json({
                ok: false,
                msg: 'Exists email'
            })
        }

        const user = new Usuario(req.body);
        //encryt pass
        const salt = bcrypt.genSaltSync()
        user.password = bcrypt.hashSync(password, salt)
        await user.save();
        //generate JWT
        const token = await generateJWT(user.id)
    
        res.status(200).json({
            ok: true,
            user,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error'
        })
    }
}

const updateUser = async(req, res= response) => {
    const uid = req.params.id

    try {
        const userDB =  await Usuario.findById(uid);
        if(!userDB){
            return res.status(404).json({
                ok: false,
                msg: 'User not exist in database'
            })
        }

        // TODO

        const {password, google, email, ...fields} = req.body;
        if(userDB.email !== email) {
            const existEmail = await Usuario.findOne({email})
            if(existEmail){
                return res.status(404).json({
                    ok: false,
                    msg: 'email exist in database'
                })
            }
        }
        fields.email = email
        const userUpdated = await Usuario.findByIdAndUpdate(uid, fields, {new: true})


        res.status(200).json({
            ok: true,
            user: userUpdated
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            error
        })
    }
}

const deleteUser = async(req, res= response)=>{
    const uid = req.params.id

    try {
        const userDB =  await Usuario.findById(uid);
        if(!userDB){
            return res.status(400).json({
                ok: false,
                msg: 'User not exist'
            })
        }

        // Buscar y eliminar el registro
        userDB.deleteOne({ uid }, (err) => {
        if (err) {
            res.status(500).json({
                ok: false,
                c: err
            })
        } else {
            res.status(200).json({
                ok: true,
                msg: 'User deleted'
            })
        }
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error'
        })
    }
}


module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser
}