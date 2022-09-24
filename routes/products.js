const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
    console.log('Request Date ' + new Date())
    next()
})

router.get('/', (req, res) => {
    res.send('product resources')
})

router.get('/:id', (req, res) => {
    res.send(req.params.id)
})

module.exports = router;