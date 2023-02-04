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
    const id = req.params.id
    const uid = req.uid

    try {
        const doctor = await Doctors.findById(id);
        if(!doctor){
            return res.status(404).json({
                ok: true,
                msg: 'Doctor not found'
            })
        }

        const changeDoctor = {
            ...req.body,
            user: uid
        }

        const updateDoctor = await Doctors.findByIdAndUpdate(id, changeDoctor, { new: true})

        res.status(201).json({
            ok: true,
            msg: 'Doctor updated',
            doctor: updateDoctor
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
    const id = req.params.id

    try {
        const doctor = await Doctors.findById(id);
        if(!doctor){
            return res.status(404).json({
                ok: true,
                msg: 'Doctor not found'
            })
        }

        await Doctors.findByIdAndDelete(id)

        res.status(201).json({
            ok: true,
            msg: 'Doctor delete',
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