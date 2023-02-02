const {Schema, model} = require('mongoose');

const DoctorSchema = Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    user: {
        require: true,
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    hospital: {
        require: true,
        type: Schema.Types.ObjectId,
        ref: 'Hospital'
    }
})

DoctorSchema.method('toJSON', function(){
    const {__v, ...object } = this.toObject();
    return object;
})

module.exports = model('Doctor', DoctorSchema);