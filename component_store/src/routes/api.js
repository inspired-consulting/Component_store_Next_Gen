const express = require('express');
const logger = require('../../winston_logger');
const router = express.Router();
const component = require('../models/component');

const tableNames = {
    componentName: 'name'
}
router.get('/exists/:key/:value', (req, res) => {
    const tableName = tableNames[req.params.key]
    component.findComponents(tableName, req.params.value)
        .then((rows) => {
            logger.warn('Data already exist in DB', rows);
            if (rows.length > 0) {
                res.status(200).send()
            } else {
                res.status(404).send()
            }
        })
        .catch((err) => {
            if (err) return res.status(500).send(err);
            return res.status(404).send()
        });
});

module.exports = router;