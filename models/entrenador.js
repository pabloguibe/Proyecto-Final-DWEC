const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const entrenadorSchema = new Schema({
    nombre: String,
    bio: String,
    ciudad: String,
    listapokemon: String
});

//Crear modelo
const Entrenador = mongoose.model('entrenador', entrenadorSchema, "entrenador");


module.exports = Entrenador;