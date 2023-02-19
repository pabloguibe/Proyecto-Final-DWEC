const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReservaSchema = new Schema({
    nombre: String,
    nombreBar: String,
    hora: String,
    numeroMesa: String,
    observaciones: String
});

//Crear modelo
const Reserva = mongoose.model('Reserva', ReservaSchema, "Reserva");


module.exports = Reserva;