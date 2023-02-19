const express = require('express');
const router = express.Router();
const Reserva = require('../models/Reserva');

function auth (req, res, next) {
    if (req.session.propietario_id) next()
    else res.status(401).send("No autenticado")
}

router.use(auth);

router.get('/', async (req, res) => {
    try {
        const arrayReservaDB = await Reserva.find();
        console.log(arrayReservaDB);
        res.render("Reserva", { 
            arrayReserva: arrayReservaDB
        })
    } catch (error) {
        console.error(error)
    }
})

router.get('/crearReserva', (req, res) => {
    res.render('crearReserva')
})

router.post('/', async (req, res) => {
    const body = req.body
    try {
        const ReservaDB = new Reserva(body) //Creamos un nuevo Entrenador
        await ReservaDB.save() //Lo guardamos con .save()
        res.redirect('/Reserva') //Volvemos al listado
    } catch (error) {
        console.log('error', error)
    }
})

router.get('/:id', async(req, res) => { 
    const id = req.params.id 
    
    try {
        const ReservaDB = await Reserva.findOne({ _id: id }) 
							
        res.render('detalleReserva', { 
            Reserva: ReservaDB,
            error: false
        })
    } catch (error) { //Si el id indicado no se encuentra
        console.log('Se ha producido un error', error)
        res.render('detalleReserva', { //Mostraremos el error en la vista "detalle"
            error: true,
            mensaje: 'Reserva no encontrado!'
        })
    }
})

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    console.log(id)
    console.log('body', body)
    try {
        const ReservaDB = await Reserva.findByIdAndUpdate(
            id, body, { useFindAndModify: false }
        )
        console.log(ReservaDB)
        res.json({
            estado: true,
            mensaje: 'Reserva editado'
        })
    } catch (error) {
        console.log(error)
        res.json({
            estado: false,
            mensaje: 'Problema al editar la Reserva'
        })
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    console.log('id desde backend', id)
    try {
       
        const ReservaDB = await Reserva.findByIdAndDelete({ _id: id });
        console.log(ReservaDB)
       
        if (!ReservaDB) {
            res.json({ 
                estado: false,
                mensaje: 'No se puede eliminar la Reserva.'
            })
        } else {
            res.json({
                estado: true,
                mensaje: 'Reserva eliminada.'
            })
        } 
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;