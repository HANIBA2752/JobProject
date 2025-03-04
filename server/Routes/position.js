const express = require('express')
const router = express.Router()

const { read } = require('../Controllers/position')

router.get('/position',(req,res) => {
    res.send('Hello Position Endpoint')
})
router.get('/position/:id',read)

router.put('/position/:id', (req,res) => {
    res.send('Hello PUT Endpoint')
})
module.exports = router