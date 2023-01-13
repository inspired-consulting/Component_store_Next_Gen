const express = require('express');
const fs = require('fs');
const { addToDB } = require('../model/componentTest');
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

    data.componentName = data.componentName.replaceAll(path.sep, ' ');
    data.inputVersion = data.inputVersion.replaceAll(path.sep, '');

    writeFileLocally(filename)
        .then(result => {
            addToDB(data).then(() => {
                const name = data.componentName.replaceAll(' ', '-');
                fs.mkdir(`./uploads/${name}/${data.inputVersion}`, { recursive: true }, (err) => {
                    if (err) throw err;
                    fs.readdir(`./uploads/${name}/${data.inputVersion}`, (err, files) => {
                        if (err) throw err;
                        if (files.length > 0) {
                            for (const file of files) {
                                fs.unlink(path.join(`./uploads/${name}/${data.inputVersion}`, file), (err) => {
                                    if (err) throw err;
                                });
                            }
                        }
                    });
                    sampleFile.mv(`./uploads/${name}/${data.inputVersion}/` + filename, function (err) {
                        if (err) return res.status(500).send(err);
                        console.log(name);
                        return res.redirect(`/componentDetails/${name}`);
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
