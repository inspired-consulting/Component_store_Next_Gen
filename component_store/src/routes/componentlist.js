const express = require('express');
const { sortComponentByNewest, sortComponentAlphabetically, listComponents } = require('../model/componentTest');
const router = express.Router();
const helper = require('../helpers/helper');
const Configuration = require('../../config/config');
const config = Configuration.load();

router.get('/', (req, res) => {
    let offset = req.query.offset;
    if (offset === undefined || offset === '') {
        offset = '0';
    }
    const query = req.query.q ? req.query.q : '';
    const params = query ? `?q=${query}` : '';
    console.log('query##', query);
    if (query.sort !== undefined && query.sort === 'abc') {
        sortComponentAlphabetically().then(rows => {
            console.log('rows##', rows);
            const component = rows.length > 0 ? rows : false;
            res.render('componentList', {
                url: '/componentlist',
                sort: 'abc',
                component,
                name: component.name,
                website: component.website
            })
        }).catch(err => {
            if (err) return res.status(500).send(err);
            return err;
        })
    } else if (query.sort !== undefined && query.sort === 'new') {
        sortComponentByNewest().then(rows => {
            const component = rows.length > 0 ? rows : false;
            res.render('componentList', {
                url: '/componentlist',
                component,
                name: component.name,
                website: component.website
            })
        }).catch(err => {
            if (err) return res.status(500).send(err);
            return err;
        })
    } else if (query.searchName !== undefined && query.searchName.length > 0) {
        // for the search input
        listComponents(config.COMPONENTS_LIMIT_PER_PAGE, offset, query.searchName)
            .then(rows => {
                const component = rows.length > 0 ? rows : false;
                res.render('componentList', {
                    url: '/componentlist',
                    name: component.name,
                    website: component.website
                })
            }).catch(err => {
                if (err) return res.status(500).send(err);
                return err;
            })
    } else {
        listComponents(config.COMPONENTS_LIMIT_PER_PAGE, offset, req.query)
            .then(rows => {
                const components = rows.result;
                const search = helper.calculatePagination(offset, config.COMPONENTS_LIMIT_PER_PAGE, rows.count);
                res.render('componentList', {
                    url: '/componentlist',
                    components,
                    name: components.name,
                    website: components.website,
                    query,
                    params,
                    search,
                    currentPage: search.currentPage,
                    pageLinks: search.pageLinks,
                    offset: search.offset
                })
            }).catch(err => {
                console.log('ERRORRRRRRR ');
                if (err) return res.status(500).send(err);
                return err;
            })
    }
});

module.exports = router;