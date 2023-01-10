const express = require('express');

const router = express.Router();
const Version = require('../models/version');

router.get('/:id', (req, res) => {
    const componentId = req.params.id;
    Version.getComponentNameAndVersionById(componentId)
        .then((rows) => {
            const component = rows.length > 0 ? rows[0] : false;
            console.log('component with ID', component);
            res.render('congratulation', {
                component: component,
                name: component.name,
                version: component.version,
                information: component.information,
                entryFile: component.entry_file,
            });
        })
        .catch((err) => {
            if (err) return res.status(500).send(err);
            // eslint-disable-next-line no-undef
            return next(err);
        });
});

module.exports = router;