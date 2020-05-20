const express = require("express");

const db = require("../data/dbConfig.js");
const accountsRouter = require('../data/Router/accounts-router.js')

const server = express();

server.use(express.json());
server.use('/api/accounts', accountsRouter);



server.use((error,req,res,next) => {
    res.status(error.status).json(error)
    
})



module.exports = server;
