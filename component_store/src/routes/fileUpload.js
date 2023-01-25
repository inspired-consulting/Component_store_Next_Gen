const express = require('express');
const fs = require('fs');
const { addToDB } = require('../model/componentTest');
// const component = require('../models/component');
const path = require('path');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('fileupload', {
        url: '/upload'
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

async function writeFileLocally (filename) {
    try {
        const componentData = {
            component: filename
        }
        return await fs.promises.writeFile('componentData.json', JSON.stringify(componentData));
    } catch (err) {
        console.error('Error occurred while writing file!', err);
    }
}

module.exports = router;
