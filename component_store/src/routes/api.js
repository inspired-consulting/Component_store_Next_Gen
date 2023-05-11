const express = require('express');
const logger = require('../../winston_logger');
const router = express.Router();
const component = require('../models/component');

const tableNames = {
    componentName: 'name'
}

/**
 * this get request checks, if the inserted component name is already used for uploading a new component.
 */
router.get('/exists/:key/:value', (req, res) => {
    const tableName = tableNames[req.params.key]
    component.findComponents(tableName, req.params.value)
        .then((rows) => {
            if (rows.length > 0) {
                logger.warn('Component name already exist in DB ' + rows.length);
                res.status(200).send()
            } else {
                logger.info('Component name is available ' + rows.length);
                res.status(404).send()
            }
        })
        .catch((err) => {
            if (err) return res.status(500).send(err);
            return res.status(404).send()
        });
});

module.exports = router;