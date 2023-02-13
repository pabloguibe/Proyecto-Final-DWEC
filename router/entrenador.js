const express = require('express');
const router = express.Router();
const Entrenador = require('../models/entrenador');

router.get('/', async (req, res) => {
    try {
        const arrayEntrenadorDB = await Entrenador.find();
        console.log(arrayEntrenadorDB);
        res.render("entrenador", { 
            arrayEntrenador: arrayEntrenadorDB
        })
    } catch (error) {
        console.error(error)
    }
})

router.get('/crearEntrenador', (req, res) => {
    res.render('crearEntrenador')
})

router.post('/', async (req, res) => {
    const body = req.body
    try {
        const entrenadorDB = new Entrenador(body) //Creamos un nuevo Entrenador
        await entrenadorDB.save() //Lo guardamos con .save()
        res.redirect('/entrenador') //Volvemos al listado
    } catch (error) {
        console.log('error', error)
    }
})

router.get('/:id', async(req, res) => { 
    const id = req.params.id 
    
    try {
        const entrenadorDB = await Entrenador.findOne({ _id: id }) 
							
        res.render('detalleEntrenador', { 
            entrenador: entrenadorDB,
            error: false
        })
    } catch (error) { //Si el id indicado no se encuentra
        console.log('Se ha producido un error', error)
        res.render('detalleEntrenador', { //Mostraremos el error en la vista "detalle"
            error: true,
            mensaje: 'Entrenador no encontrado!'
        })
    }
})

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    console.log(id)
    console.log('body', body)
    try {
        const entrenadorDB = await Entrenador.findByIdAndUpdate(
            id, body, { useFindAndModify: false }
        )
        console.log(entrenadorDB)
        res.json({
            estado: true,
            mensaje: 'Entrenador editado'
        })
    } catch (error) {
        console.log(error)
        res.json({
            estado: false,
            mensaje: 'Problema al editar el Entrenador'
        })
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    console.log('id desde backend', id)
    try {
       
        const entrenadorDB = await Entrenador.findByIdAndDelete({ _id: id });
        console.log(entrenadorDB)
       
        if (!entrenadorDB) {
            res.json({ 
                estado: false,
                mensaje: 'No se puede eliminar el entrenador.'
            })
        } else {
            res.json({
                estado: true,
                mensaje: 'Entrenador eliminado.'
            })
        } 
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;