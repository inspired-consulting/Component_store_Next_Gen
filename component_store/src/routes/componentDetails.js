const express = require('express');
const { readFromDB } = require('../model/componentTest');
const router = express.Router();

function compareIds (a, b) {
    return b.id - a.id;
}

router.get('/:name', (req, res) => {
    const componentName = req.params.name;
    const parsedcomponentName = componentName.replaceAll('-', ' ');
    readFromDB(parsedcomponentName)
        .then(rows => {
            const component = rows.length > 0 ? rows.sort(compareIds).shift() : false;
            const newcomp = component;
            console.log('newcomp components', newcomp);
            const olderversions = rows.length > 0 ? rows : false;
            console.log('older components', olderversions);
            res.render('componentDetails', {
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
            console.log(err);
            return res.redirect('/');
        })
})

module.exports = router;