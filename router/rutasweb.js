const express=require('express');
const router=express.Router();

router.get('/', (req,res)=>{
    res.render("index",{
        titulo:"titulo dinamico"
    })
})

router.get('/gimnasios', (req,res)=>{
    res.render("gimnasios",{
        titulo:"Gimnasios"
    })
})


module.exports=router;