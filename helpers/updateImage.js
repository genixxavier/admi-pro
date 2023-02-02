const fs = require('fs')

const Hospitals = require('../models/hospital');
const Users = require('../models/user');
const Doctors = require('../models/doctor');

const deleteImage = (model, image) => {
    const pathOld = `./uploads/${model}/${image}`
    if(fs.existsSync(pathOld)){
        fs.unlinkSync(pathOld)
    }
}

const updateImage = async (model, id, nameFile) => {
    switch (model) {
        case 'doctors':
            const doctor = await Doctors.findById(id)
            if(!doctor){
                return false
            }
            
            deleteImage(model, doctor.image)

            doctor.image = nameFile
            await doctor.save()
            
            return true

        case 'hospitals':
            const hospital = await Hospitals.findById(id)
            if(!hospital){
                return false
            }
            
            deleteImage(model, hospital.image)

            hospital.image = nameFile
            await hospital.save()
            
            return true
        case 'users':
            const user = await Users.findById(id)
            if(!user){
                return false
            }
            
            deleteImage(model, user.image)

            user.image = nameFile
            await user.save()
            
            return true
    
        default:
            break;
    }
}


module.exports = {
    updateImage
}