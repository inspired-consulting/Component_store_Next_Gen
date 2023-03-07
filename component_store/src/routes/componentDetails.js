const express = require('express');
const { readFromDB } = require('../models/component');
const router = express.Router();
const logger = require('../../logger/select-logger');

function compareIds (a, b) {
    return b.id - a.id;
}

router.get('/:name', (req, res) => {
    const componentName = req.params.name;
    readFromDB(componentName)
        .then(rows => {
            //  logger.debug('rowsc from componentlist', rows);
            const component = rows.length > 0 ? rows.sort(compareIds).shift() : false;
            const newcomp = component;
            const olderversions = rows.length > 0 ? rows : false;
            res.render('componentDetails', {
                url: '/componentDetails',
                component: newcomp,
                olderversions,
                name: newcomp.name,
                namelink: req.params.name,
                version: newcomp.version,
                publisher: newcomp.publisher,
                information: newcomp.information,
                entryFile: newcomp.entry_file
            })
        })
        .catch(err => {
            logger.error(err);
            return res.redirect('/');
        })
})

module.exports = router;