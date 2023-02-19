const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PropietarioSchema = new Schema({
    nombre: String,
    correo: String,
    password: String, // habría que encriptarla antes de guardarla
    telefono: String
});

//Crear modelo
const Propietario = mongoose.model('Propietario', PropietarioSchema, "Propietario");


module.exports = Propietario;


