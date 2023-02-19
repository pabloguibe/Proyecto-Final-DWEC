const express=require('express');
const router=express.Router();

const Propietario = require("../models/Propietario")

function auth (req, res, next) {
    if (req.session.propietario_id) next()
    else res.status(401).send("No autenticado")
}

router.get('/registro', (req,res)=>{
    res.render("registro",{
        titulo:"titulo dinamico"
    })
})

router.get('/login', (req,res)=>{
    res.render("login",{
        titulo:"titulo dinamico"
    })
})

router.post('/registrar-propietario', async (req,res)=>{
    const body = req.body
    try {
        const propietario = new Propietario(body)
        await propietario.save()

        req.session.regenerate((err) => {
            if (err) res.send(err);
            
            req.session.propietario_id = propietario._id
            req.session.save(err => {
                if (err) res.send(err)

                console.log("Propietario creado!")
                res.redirect("/")
            });
        });
    
    } catch (error) {
        console.log('error', error)
        if (error && error.code == 11000)
            res.send("El nombre de usuario está en uso")
    }
})


router.post('/login', async (req,res)=>{

    console.log(req.body)

    const propietario = await Propietario.findOne({ nombre: req.body.nombre_usuario });

    if (!propietario) res.send("No existe el usuario");
    else {
        if (propietario.password != req.body.password) 
            res.send("La contraseña es incorrecta");
        else {
            req.session.regenerate((err) => {
                if (err) res.send(err);
                
                req.session.propietario_id = propietario._id
                req.session.save(err => {
                    if (err) res.send(err)
        
                    res.redirect("/")
                });
            });
        }
    }
})

router.get('/logout', async (req,res)=>{
    req.session.propietario_id = null
    req.session.save(function (err) {
        if (err) next(err)

        req.session.regenerate(function (err) {
            if (err) next(err)
            res.redirect('/login')
        })
    })
})

router.get('/', (req,res)=>{

    console.log(req.session)

    if (req.session.propietario_id)
        res.render("index",{
            titulo:"titulo dinamico"
        })
    else res.redirect("/login")
})

router.get('/mesas', auth, (req,res)=>{
    res.render("mesas",{
        titulo:"mesas"
    })
})

router.get('/tareas', auth, (req,res)=>{
    res.render("tareas",{
        titulo:"tareas"
    })
})


module.exports=router;