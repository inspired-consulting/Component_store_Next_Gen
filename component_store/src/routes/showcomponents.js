const express = require('express');
const { sortComponentByNewest, searchComponentByName, sortComponentAlphabetically } = require('../model/componentTest');
const router = express.Router();

router.get('/', (req, res) => {
    const data = req.query;
    if (data.sort !== undefined && data.sort === 'abc') {
        sortComponentAlphabetically().then(rows => {
            const component = rows.length > 0 ? rows : false;
            res.render('showcomponents', {
               // url: '/',
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
        sortComponentByNewest().then(rows => {
            const component = rows.length > 0 ? rows : false;
            res.render('showcomponents', {
               // url: '/',
                component,
                name: component.name,
                website: component.website
            })
        }).catch(err => {
            if (err) return res.status(500).send(err);
            return err;
        })
    } else if (data.searchName !== undefined && data.searchName.length > 0) {
        // for the search input
        searchComponentByName(data.searchName).then(rows => {
            const component = rows.length > 0 ? rows : false;
            res.render('showcomponents', {
              //  url: '/',
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
        sortComponentByNewest().then(rows => {
            const component = rows.length > 0 ? rows : false;
            res.render('showcomponents', {
             //   url: '/',
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