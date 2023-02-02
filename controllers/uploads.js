const path = require('path')
const fs = require('fs')

const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const { updateImage } = require('../helpers/updateImage');


const uploadFiles = async(req, res)=>{
    const { model, id } = req.params;
    const typesValid = ['hospitals','doctors','users']
    if(!typesValid.includes(model)){
        return res.status(500).json({
            ok: false,
            msg: 'The type isnot valid: '+ model
        })
    }

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(500).json({
            ok: false,
            msg: 'File is empty'
        })
    }

    const file = req.files.image;
    const nameLow = file.name.split('.')
    const extendFile = nameLow[nameLow.length - 1]
    const extendsValid = ['png','jpg','jpeg', 'gif']

    if(!extendsValid.includes(extendFile)){
        return res.status(500).json({
            ok: false,
            msg: 'File isnot valid'
        })
    }

    //generate name file
    const nameFile = `${uuidv4()}.${extendFile}`
    //path file
    const path = `./uploads/${model}/${nameFile}`

    // Use the mv() method to place the file somewhere on your server
    file.mv(path, function(err) {
        if (err){
            console.log(err)
            return res.status(500).send({
                ok: false,
                msg: 'Error,It not to move file'
            });
        }

        updateImage(model, id, nameFile)

        res.status(200).json({
            ok: true,
            image: 'File upload: '+nameFile
        })
    });

}

const getFile = async(req, res)=>{
    const { model, image } = req.params;
    let pathImg = path.join(__dirname, `../uploads/${model}/${image}`)
    
    if(!fs.existsSync(pathImg)){
        pathImg = path.join(__dirname, `../uploads/default.jpg`)
    }

    res.sendFile(pathImg)

}

module.exports = {
    uploadFiles,
    getFile
}