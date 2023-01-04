const express = require('express');
const { readCompFromDB, readCompNameFromDB } = require('../model/componentTest');
const router = express.Router();

router.get('/', (req, res) => {
    const data = req.query;
    if (data.sort !== undefined && data.sort === 'abc') {
        console.log('show components in alphabetical order');
        readCompFromDB().then(rows => {
            const component = rows.length > 0 ? rows : false;
            res.render('showcomponents', {
                url: '/components/list',
                sort: 'abc',
                component,
                name: component.name,
                website: component.website
            })
        }).catch(err => {
            if (err) return res.status(500).send(err);
            return err;
        })
    } else if (data.sort !== undefined && data.sort === 'new') {
        console.log('show new components');
    } else if (data.sort !== undefined && data.sort === 'fav') {
        console.log('show favorite components');
    } else if (data.searchName !== undefined && data.searchName.length > 0) {
        // for the search input
        readCompNameFromDB(data.searchName).then(rows => {
            const component = rows.length > 0 ? rows : false;
            res.render('showcomponents', {
                url: '/test',
                component,
                name: component.name,
                website: component.website,
                searchName: data.searchName
            })
        }).catch(err => {
            if (err) return res.status(500).send(err);
            return err;
        })
    } else {
        readCompFromDB().then(rows => {
            const component = rows.length > 0 ? rows : false;
            res.render('showcomponents', {
                url: '/test',
                component,
                name: component.name,
                website: component.website
            })
        }).catch(err => {
            if (err) return res.status(500).send(err);
            return err;
        })
    }
});

module.exports = router;