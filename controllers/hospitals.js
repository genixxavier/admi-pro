const { response } = require('express')
const Hospitals = require('../models/hospital');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');


const getHospitals = async(req, res)=>{
    const hospitals = await Hospitals.find().populate('user', 'name img')
    res.status(200).json({
        ok: true,
        hospitals
    })
}

const createHospital = async(req, res= response)=>{
    const uid = req.uid
    const hospital = new Hospitals({
        user: uid,
        ...req.body
    })

    try {
        const hospitalDB = await hospital.save()
        res.status(200).json({
            ok: true,
            hospital: hospitalDB
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error'
        })
    }
}

const updateHospital = async(req, res= response) => {
    const uid = req.params.id

    try {

        res.status(200).json({
            ok: true,
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            error
        })
    }
}

const deleteHospital = async(req, res= response)=>{
    const uid = req.params.id

    try {
        

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error'
        })
    }
}


module.exports = {
    getHospitals,
    createHospital,
    updateHospital,
    deleteHospital
}