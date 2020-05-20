const express = require('express');
const knex = require('../dbConfig.js');



const router = express.Router();


router.use((req,res,next) => {
    console.log('Accounts Router Used')
    next();
})


//do we need to send status we didint do on guided proj?
router.get('/', async (req,res) => {

    try{
        const accounts = await knex('accounts')
        res.json(accounts)  
    }catch (err){
        //  next({status:404, message:"biseler"})
        res.status(500).json({errorMessage: "Server Error", error:err})
    }


})


router.get('/:id', async (req,res) => {
    const {id} = req.params ;

   
    try{
        const [account] = await knex('accounts').where({id});
        res.json(account)  
    }catch(err){
        res.status(500).json({errorMessage: "Server Error", error:err})
    }
    


    // knex('accounts').where({id})
    // .then(account => {
    //  res.status(200).json(account);
    // }).catch(err => {
    //     res.status(500).json({errorMessage: "Server Error", error:err})
    // })

})

router.post('/', (req,res) => {
   
    knex('accounts').insert(req.body)
    .then(account => {
        res.json(req.body)
    }).catch(err => {
        res.status(500).json({errorMessage: "Server Error", error:err})
    })

  })


  router.put('/:id' , async (req,res) => {
  
    const {id} = req.params ;
   
        
            try{
                await   knex('accounts').update(req.body).where({id})
                res.status(200).json(req.body)
            }catch(err){
                res.status(500).json({errorMessage: "Server Error", error:err})
            }


})


router.delete('/:id', async (req,res) => {
    const {id} = req.params ;
    try{
        const [deleted] =  await knex('accounts').where({id});
        const count = await knex('accounts').del().where({id});
      if (count > 0) {
     
        res.status(200).json(deleted )
    } else {
        res.status(404).json({ message: 'invalid id' });
    }
        
    }catch(err){
        res.status(500).json({errorMessage: "Server Error", error:err})
    }
})




module.exports = router;