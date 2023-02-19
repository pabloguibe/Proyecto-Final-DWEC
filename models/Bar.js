const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BarSchema = new Schema({
    nombre: String,
    horario: String,
    direccion: String,
    observaciones: String
});

//Crear modelo
const Bar = mongoose.model('Bar', BarSchema, "Bar");


module.exports = Bar;


