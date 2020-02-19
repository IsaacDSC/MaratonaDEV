const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Doador = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    blood: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }

})

//criando uma collection
mongoose.model('doadores', Doador)