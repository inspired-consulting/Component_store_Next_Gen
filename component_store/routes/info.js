const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({info: 'hello there again'});
})

router.post('/', (req, res) => {

    const { parcel } = req.body;
    console.log("parcel",parcel);
    if (!parcel){
        return res.status(400).send({status: 'failed'});
    }
    res.status(200).send({status: 'received'});
})

module.exports = router;