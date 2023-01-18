const express = require('express');
const { listComponents } = require('../model/componentTest');
const router = express.Router();
const helper = require('../helpers/helper');
const Configuration = require('../../config/config');
const config = Configuration.load();

router.get('/', (req, res) => {
    const offset = req.query.offset || '0';
    const query = req.query.q ? req.query.q : '';
    console.log('query##', query);
    const preset = req.query.p;
    console.log('preset##', preset);
    if (preset) {
        switch (preset) {
        case 'abc':
            listComponents(config.COMPONENTS_LIMIT_PER_PAGE, offset, 'abc', 'name', 'asc')
                .then(rows => {
                    const components = rows.result;
                    const search = helper.calculatePagination(offset, config.COMPONENTS_LIMIT_PER_PAGE, rows.count);
                    res.render('componentList', {
                        url: '/componentlist',
                        components,
                        name: components.name,
                        website: components.website,
                        params: { p: preset },
                        search,
                        currentPage: search.currentPage,
                        pageLinks: search.pageLinks,
                        offset: search.offset
                    })
                }).catch(err => {
                    if (err) return res.status(500).send(err);
                    return err;
                })
            break;
        case 'new':
        default:
            listComponents(config.COMPONENTS_LIMIT_PER_PAGE, offset, 'new', 'id', 'desc')
                .then(rows => {
                    const components = rows.result;
                    const search = helper.calculatePagination(offset, config.COMPONENTS_LIMIT_PER_PAGE, rows.count);
                    res.render('componentList', {
                        url: '/componentlist',
                        components,
                        name: components.name,
                        website: components.website,
                        params: { p: preset },
                        search,
                        currentPage: search.currentPage,
                        pageLinks: search.pageLinks,
                        offset: search.offset
                    })
                }).catch(err => {
                    if (err) return res.status(500).send(err);
                    return err;
                })
        }
    } else {
        listComponents(config.COMPONENTS_LIMIT_PER_PAGE, offset, req.query, 'id', 'asc')
            .then(rows => {
                const components = rows.result;
                const count = rows.count;
                console.log('seach result', rows);
                const search = helper.calculatePagination(offset, config.COMPONENTS_LIMIT_PER_PAGE, count);
                res.render('componentList', {
                    url: '/componentlist',
                    components,
                    name: components.name,
                    website: components.website,
                    query,
                    count,
                    params: { q: query },
                    search,
                    currentPage: search.currentPage,
                    pageLinks: search.pageLinks,
                    offset: search.offset
                })
            }).catch(err => {
                if (err) return res.status(500).send(err);
                return err;
            })
    }
});

module.exports = router;