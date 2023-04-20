const express = require('express');
const fs = require('fs');
const { addToDB } = require('../models/database');
const path = require('path');
const router = express.Router();
const component = require('../models/component');
const logger = require('../../winston_logger');

router.get('/', (req, res) => {
    res.render('fileupload', {
        url: '/upload'
    })
});

router.get('/update', (req, res) => {
    const componentName = req.query.componentName
    if (componentName) {
        component.getComponentDetailsByName(componentName)
            .then((rows) => {
                const existingComponent = rows[0];
                res.render('updateComponent', {
                    url: '/upload/update',
                    componentName: componentName,
                    existingComponent: existingComponent
                })
            })
    }
});

router.post('/update/:componentName', (req, res, next) => {
    const sampleFile = req.files.updateFileUpload;
    const componentName = req.params.componentName;
    const filename = sampleFile.name;
    const data = req.body;
    const inputVersion = data.updateInputVersion;

    fs.mkdir(`./uploads/${componentName}/${inputVersion}`, { recursive: true }, (err) => {
        if (err) {
            logger.error(`Creating the directory ${componentName}/${inputVersion} failed ` + err);
            return res.status(500).send(err);
        }
        fs.readdir(`./uploads/${componentName}/${inputVersion}`, (err, files) => {
            if (err) {
                logger.error(`Reading the directory ${componentName}/${inputVersion} failed ` + err);
                return res.status(500).send(err);
            }
            if (files.length > 0) {
                for (const file of files) {
                    fs.unlink(path.join(`./uploads/${componentName}/${inputVersion}`, file), (err) => {
                        if (err) { logger.error(`Removing the file ${file} failed ` + err); }
                    });
                }
            }
        });
        sampleFile.mv(`./uploads/${componentName}/${inputVersion}/` + filename, function (err) {
            if (err) {
                logger.error(`Can not move file ${filename} into directory ` + err);
                return res.status(500).send(err);
            }
            addToDB(data, componentName, filename).then(() => {
                return res.redirect(`/componentDetails/${componentName}`);
            }).catch(error => {
                if (error) {
                    logger.error('addToDB throws error ' + error);
                    return res.status(500).send('addToDB throws error ' + error);
                }
                return next(error);
            })
        });
    })
});

router.post('/', (req, res, next) => {
    const sampleFile = req.files.fileUpload;
    const filename = sampleFile.name;
    const data = req.body;
    const componentName = data.componentName;
    const inputVersion = data.inputVersion;

    fs.mkdir(`./uploads/${componentName}/${inputVersion}`, { recursive: true }, (err) => {
        if (err) {
            logger.error(`Creating the directory ${componentName}/${inputVersion} failed ` + err);
            return res.status(500).send(err);
        }
        fs.readdir(`./uploads/${componentName}/${inputVersion}`, (err, files) => {
            if (err) {
                logger.error(`Reading the directory ${componentName}/${inputVersion} failed ` + err);
                return res.status(500).send(err);
            }
            if (files.length > 0) {
                for (const file of files) {
                    fs.unlink(path.join(`./uploads/${componentName}/${inputVersion}`, file), (err) => {
                        if (err) { logger.error(`Removing the file ${file} failed ` + err); }
                    });
                }
            }
        });
        sampleFile.mv(`./uploads/${componentName}/${inputVersion}/` + filename, function (err) {
            if (err) {
                logger.error(`Can not move file ${filename} into directory failed ` + err);
                return res.status(500).send(err);
            }
            addToDB(data, '', filename).then(() => {
                return res.redirect(`/componentDetails/${componentName}`);
            }).catch(err => {
                if (err) {
                    logger.error('addToDB throws error ' + err);
                    return res.status(500).send('addToDB throws error ' + err);
                }
                return next(err);
            })
        });
    })
});

module.exports = router;
