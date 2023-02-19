const express = require('express');
const router = express.Router();
const Bar = require('../models/Bar');

function auth (req, res, next) {
    if (req.session.propietario_id) next()
    else res.status(401).send("No autenticado")
}

router.use(auth);

router.get('/', async (req, res) => {
    try {
        //Le pondremos arrayPokemonDB para diferenciar
        //los datos que vienen de la base de datos
        //con respecto al arrayPokemon que tenemos EN LA VISTA
        const arrayBarDB = await Bar.find();
        res.render("Bar", {
            arrayBar: arrayBarDB
        })
    } catch (error) {
        console.error(error)
    }
})

router.get('/crear', (req, res) => {
    res.render('crear')
})

router.post('/', async (req, res) => {
    const body = req.body
    try {
        const BarDB = new Bar(body)
        await BarDB.save()
        res.redirect('/Bar')
    } catch (error) {
        console.log('error', error)
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id

    try {
        const BarDB = await Bar.findOne({ _id: id })

        res.render('detalle', {
            Bar: BarDB,
            error: false
        })
    } catch (error) { //Si el id indicado no se encuentra
        console.log('Se ha producido un error', error)
        res.render('detalle', { //Mostraremos el error en la vista "detalle"
            error: true,
            mensaje: 'Pokemon no encontrado!'
        })
    }
})

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    try {
        const BarDB = await Bar.findByIdAndUpdate(
            id, body, { useFindAndModify: false }
        )
        res.json({
            estado: true,
            mensaje: 'Pokémon editado'
        })
    } catch (error) {
        console.log(error)
        res.json({
            estado: false,
            mensaje: 'Problema al editar el Pokémon'
        })
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    console.log('id desde backend', id)
    try {

        const BarDB = await Bar.findByIdAndDelete({ _id: id });

        if (!BarDB) {
            res.json({
                estado: false,
                mensaje: 'No se puede eliminar el Pokémon.'
            })
        } else {
            res.json({
                estado: true,
                mensaje: 'Pokémon eliminado.'
            })
        }
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;