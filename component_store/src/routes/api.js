const express = require('express');
const router = express.Router();
const component = require('../models/component');
const logger = require('../../logger/select-logger');

const tableNames = {
    componentName: 'name'
}
router.get('/exists/:key/:value', (req, res) => {
    const tableName = tableNames[req.params.key]
    component.findComponents(tableName, req.params.value)
        .then((rows) => {
            if (rows.length > 0) {
                logger.debug('component name exits in DB - update component');
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