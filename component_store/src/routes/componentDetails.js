const express = require('express');
const { readFromDB } = require('../models/component');
const router = express.Router();
const logger = require('../../winston_logger');

function compareIds (a, b) {
    return b.id - a.id;
}

/**
 * This get request renders the details of a component
 */
router.get('/:name', (req, res) => {
    const componentName = req.params.name;
    readFromDB(componentName)
        .then(rows => {
            const component = rows.length > 0 ? rows.sort(compareIds).shift() : false;
            const newcomp = component;
            const olderversions = rows.length > 0 ? rows : false;
            res.render('componentDetails', {
                url: '/componentDetails',
                component: newcomp,
                olderversions: olderversions,
                name: newcomp.name,
                namelink: req.params.name,
                version: newcomp.version,
                publisher: newcomp.publisher,
                information: newcomp.information,
                entryFile: newcomp.entry_file
            })
        })
        .catch(err => {
            logger.error('read from DB failed ' + err);
            return res.redirect('/');
        })
})

module.exports = router;