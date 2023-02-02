const { response } = require('express')
const Users = require('../models/user');
const Doctors = require('../models/doctor');
const Hospitals = require('../models/hospital');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');


const getSeraches = async(req, res)=>{
    const search = req.params.words;
    const regex = new RegExp(search, 'i');

    const [users, doctors, hospitals] = await Promise.all([
        Users.find({name: regex}),
        Doctors.find({name: regex}),
        Hospitals.find({name: regex})
    ])
   
    res.status(200).json({
        ok: true,
        users,
        doctors,
        hospitals
    })
}

const getSearchCollections = async(req, res)=>{
    const table = req.params.table;
    const search = req.params.words;
    const regex = new RegExp(search, 'i');
    let status = 200
    let result = 'The table not exist'

    switch (table) {
        case 'doctors':
            result = await Doctors.find({name: regex}).populate('user', 'name img').populate('hospital', 'name img')
            break;
        case 'hospitals':
            result = await Hospitals.find({name: regex}).populate('user', 'name img')
        break;
        case 'users':
            result = await Users.find({name: regex})
            break;
        default:
            status = 400
            break;
    }

    res.status(status).json({
        ok: false,
        result
    })
}


module.exports = {
    getSeraches,
    getSearchCollections
}