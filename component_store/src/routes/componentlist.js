const express = require('express');
const { listComponents } = require('../models/component');
const router = express.Router();
const helper = require('../helpers/helper');
const Configuration = require('../../config/config');
const config = Configuration.load();

/**
 * loads the components from the db and
 * sorts the components in the following ways:
 *  - alphabetically
 *  - newest components first (default)
 *  - ascending
 *  - specific with search string
 *
 * it is also possible to set the components,
 * which should be displayed per page.
 */
router.get('/', (req, res) => {
    const offset = req.query.offset || '0';
    const query = req.query.q ? req.query.q : '';
    const preset = req.query.p;
    const presetType = req.query.p === 'abc' ? 'abc' : 'new'
    if (preset) {
        switch (preset) {
        case 'abc':
            listComponents(config.COMPONENTS_LIMIT_PER_PAGE, offset, 'abc', 'name', 'asc')
                .then(rows => {
                    const components = rows.result;
                    const search = helper.calculatePagination(offset, config.COMPONENTS_LIMIT_PER_PAGE, rows.count);
                    res.render('componentList', {
                        url: '/componentlist',
                        components: components,
                        name: components.name,
                        website: components.website,
                        params: { p: preset },
                        presetType: presetType,
                        search: search,
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
                        components: components,
                        name: components.name,
                        website: components.website,
                        params: { p: preset },
                        presetType: presetType,
                        search: search,
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
                const search = helper.calculatePagination(offset, config.COMPONENTS_LIMIT_PER_PAGE, count);
                res.render('componentList', {
                    url: '/componentlist',
                    components: components,
                    name: components.name,
                    website: components.website,
                    query: query,
                    count: count,
                    params: { q: query },
                    search: search,
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