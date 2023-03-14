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
                    componentName,
                    existingComponent
                })
            })
    } else {
        res.render('updateComponent', {
            url: '/upload/update',
            componentName
        })
    }
});

router.post('/update/:componentName', (req, res, next) => {
    const sampleFile = req.files.updateFileUpload;
    const componentName = req.params.componentName;
    const filename = sampleFile.name;
    const data = req.body;
    const inputVersion = data.updateInputVersion;

    writeFileLocally(filename)
        .then(result => {
            addToDB(data, componentName).then(() => {
                fs.mkdir(`./uploads/${componentName}/${inputVersion}`, { recursive: true }, (err) => {
                    if (err) throw err;
                    fs.readdir(`./uploads/${componentName}/${inputVersion}`, (err, files) => {
                        if (err) throw err;
                        if (files.length > 0) {
                            for (const file of files) {
                                fs.unlink(path.join(`./uploads/${componentName}/${inputVersion}`, file), (err) => {
                                    if (err) throw err;
                                });
                            }
                        }
                    });
                    sampleFile.mv(`./uploads/${componentName}/${inputVersion}/` + filename, function (err) {
                        if (err) return res.status(500).send(err);
                        return res.redirect(`/componentDetails/${componentName}`);
                    });
                })
            })
                .catch(err => {
                    if (err) return res.status(500).send('addToDB throws error');
                    return next(err);
                })
        })
        .catch(err => {
            if (err) return res.status(500).send(err);
            return next(err);
        })
});

router.post('/', (req, res, next) => {
    const sampleFile = req.files.fileUpload;
    const filename = sampleFile.name;
    const data = req.body;
    const componentName = data.componentName;
    const inputVersion = data.inputVersion;

    writeFileLocally(filename)
        .then(result => {
            addToDB(data).then(() => {
                fs.mkdir(`./uploads/${componentName}/${inputVersion}`, { recursive: true }, (err) => {
                    if (err) { logger.error('Creating the directory failed ' + err); }
                    fs.readdir(`./uploads/${componentName}/${inputVersion}`, (err, files) => {
                        if (err) { logger.error('Reading the directory failed ' + err); }
                        if (files.length > 0) {
                            for (const file of files) {
                                fs.unlink(path.join(`./uploads/${componentName}/${inputVersion}`, file), (err) => {
                                    if (err) { logger.error('Removing the file failed ' + err); }
                                });
                            }
                        }
                    });
                    sampleFile.mv(`./uploads/${componentName}/${inputVersion}/` + filename, function (err) {
                        if (err) {
                            logger.error(`Can not move file ${filename} into directory failed ` + err);
                            return res.status(500).send(err);
                        }
                        return res.redirect(`/componentDetails/${componentName}`);
                    });
                })
            })
                .catch(err => {
                    if (err) {
                        logger.error('something went wrong ' + err);
                        return res.status(500).send('addToDB throws error ' + err);
                    }
                    return next(err);
                })
        })
        .catch(err => {
            if (err) {
                logger.error('something went wrong ' + err);
                return res.status(500).send(err);
            }
            return next(err);
        })
});

async function writeFileLocally (filename) {
    try {
        const componentData = {
            component: filename
        }
        return await fs.promises.writeFile('componentData.json', JSON.stringify(componentData));
    } catch (err) {
        logger.error('Error occurred while writing file!', err);
    }
}

module.exports = router;
