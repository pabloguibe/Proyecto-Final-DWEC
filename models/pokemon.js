const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pokemonSchema = new Schema({
    nombre: String,
    Tipo: String,
    descripcion: String
});

//Crear modelo
const Pokemon = mongoose.model('pokemon', pokemonSchema, "pokemon");


module.exports = Pokemon;


