const fs = require('fs');
const express = require('express');

const router = express.Router();
const Component = require('../models/component');
const Version = require('../models/version');

router.get('/', (req, res) => {
    res.render('fileupload', {});
});

router.post('/', (req, res, next) => {
    const data = req.body;
    console.log('data', data);
    data.componentName = data.componentName.replaceAll('/', '_');
    data.inputVersion = data.inputVersion.replaceAll('/', '_');
    console.log('Newdata', data);
    const sampleFile = req.files.fileUpload;
    const filename = sampleFile.name;

    writeFileLocally(filename)
        .then(() => {
            Component.createComponent(data)
                .then((result) => {
                    const componentId = result;
                    Version.createVersion(data, componentId, filename)
                        .then((id) => {
                            fs.mkdir(`./uploads/${data.componentName}/${data.inputVersion}`, { recursive: true }, (err) => {
                                if (err) throw err;
                                // eslint-disable-next-line no-shadow
                                sampleFile.mv(`./uploads/${data.componentName}/${data.inputVersion}/${filename}`, (err) => {
                                    if (err) return res.status(500).send(err);
                                    console.log('sending files to uploads.');
                                    return res.redirect(`/congrats/${id}`);
                                });
                            });
                        });
                })
                .catch((err) => {
                    if (err) return res.status(500).send('Error while inserting component value.', err);
                    return next(err);
                });
        })
        .catch((err) => {
            if (err) return res.status(500).send(err);
            return next(err);
        });
});

// eslint-disable-next-line consistent-return
async function writeFileLocally(filename) {
    try {
        const componentData = {
            component: filename,
        };
        return await fs.promises.writeFile('componentData.json', JSON.stringify(componentData));
    } catch (err) {
        console.error('Error occurred while writing file!', err);
    }
}

module.exports = router;
