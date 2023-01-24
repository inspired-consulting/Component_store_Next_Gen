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


// router.get('/', (req, res, next) => {
//     const componentName = req;
//     console.log('componentName##', componentName);
//     component.findComponents(componentName)
//         .then((rows) => {
//             res.render('fileupload', {
//                 url: '/upload'
//             });
//         })
//         .catch((err) => {
//             if (err) return res.status(500).send(err);
//             return next(err);
//         });
// });

// router.post('/', (req, res, next) => {
//     const sampleFile = req.files.fileUpload;
//     const filename = sampleFile.name;
//     const data = req.body;
//     console.log('data', data);

//     data.componentName = data.componentName.replaceAll(/[&\/\\#,+()$~%.'":*?<>{}]/g, '-');
//     data.inputVersion = data.inputVersion.replaceAll('/', '');

//     writeFileLocally(filename)
//         .then(result => {
//             addToDB(data).then((rows) => {
//                 console.log('rows from Db', rows);
//                 const name = data.componentName;
//                 console.log('name', name);
//                 fs.mkdir(`./uploads/${name}/${data.inputVersion}`, { recursive: true }, (err) => {
//                     if (err) throw err;
//                     fs.readdir(`./uploads/${name}/${data.inputVersion}`, (err, files) => {
//                         if (err) throw err;
//                         if (files.length > 0) {
//                             for (const file of files) {
//                                 fs.unlink(path.join(`./uploads/${name}/${data.inputVersion}`, file), (err) => {
//                                     if (err) throw err;
//                                 });
//                             }
//                         }
//                     });
//                     sampleFile.mv(`./uploads/${name}/${data.inputVersion}/` + filename, function (err) {
//                         if (err) return res.status(500).send(err);
//                         console.log(name);
//                         return res.redirect(`/componentDetails/${name}`);
//                     });
//                 })
//             })
//                 .catch(err => {
//                     if (err) return res.status(500).send('addToDB throws error');
//                     return next(err);
//                 })
//         })
//         .catch(err => {
//             if (err) return res.status(500).send(err);
//             return next(err);
//         })
// });
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
