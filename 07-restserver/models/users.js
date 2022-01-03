const { Schema, model } = require('mongoose')

const UserSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        require: true,
        enum: ['ADMIN', 'USER']
    },
    status: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }

})

//Es necesario usar una funcion normal para de esta manera poder acceder al this
UserSchema.methods.toJSON = function () {
    const { __v, password, _id:uid, ...user } = this.toObject()
    return {uid, ...user}
}

module.exports = model('User', UserSchema)