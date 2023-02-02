const { response } = require('express')
const Doctors = require('../models/doctor');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');


const getDoctors = async(req, res)=>{
    const doctors = await Doctors.find().populate('hospital','name').populate('user', 'name');
    res.status(200).json({
        ok: true,
        doctors
    })
}

const createDoctor = async(req, res= response)=>{
    const uid = req.uid
    const doctor = new Doctors({
        user: uid,
        ...req.body
    })

    try {
        const doctorDB = await doctor.save()
        res.status(200).json({
            ok: true,
            doctor: doctorDB
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error'
        })
    }
}

const updateDoctor = async(req, res= response) => {
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

const deleteDoctor = async(req, res= response)=>{
    const uid = req.params.id

    try {
        res.status(200).json({
            ok: true,
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error'
        })
    }
}


module.exports = {
    getDoctors,
    createDoctor,
    updateDoctor,
    deleteDoctor
}