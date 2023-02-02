const {Schema, model} = require('mongoose');

const HospitalSchema = Schema({
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
    }
}, {
    collection: 'hospitals' //moddif name of collection
})

HospitalSchema.method('toJSON', function(){
    const {__v, ...object } = this.toObject();
    return object;
})

module.exports = model('Hospital', HospitalSchema);