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
    const data = req.body
    console.log('data', data);
    data.componentName = data.componentName.replaceAll(path.sep, ' ');
    data.inputVersion = data.inputVersion.replaceAll(path.sep, '');
    console.log('Newdata', data);
    const sampleFile = req.files.fileUpload;
    const filename = sampleFile.name;

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
                        console.log('sending files to uploads.');
                        console.log(name);
                        return res.redirect(`/congrats/${name}`);
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

// router.get('/', (req, res, next) => {
//     Component.findComponents('id', 5)
//     .then(rows => {
//         console.log("componentData",rows);
//          if (rows.length > 0) {
//             const component = rows[0];
//             Version.findVersionData('component_id', component.id)
//             .then(rows => {
//                 const versionData = rows[0];
//                 console.log("versionData",versionData);
//                 res.render('fileupload', {
//                     component: component,
//                     versionData: versionData
//                 })
//             })
//         }
//     })
//     .catch(err => {
//         return next(err);
//     })
// });
// router.post('/', function(req, res) {
//     const componentName = req.body.componentName;
//     const inputVersion = req.body.inputVersion;
//     let sampleFile = req.files.fileUpload;
//     let filename = sampleFile.name;

//     const componentData = {
//         'componentName': componentName,
//         'inputVersion': inputVersion,
//     }

//     fs.writeFile('componentData.json', JSON.stringify(componentData), (err) => {
//         if (err) throw err;
//         console.log('componentData saved!');
//     });

//     if (!req.files || Object.keys(req.files).length == 0) {
//         return res.status(400).send('No files were uploaded.');
//     }
//     sampleFile.mv('./uploads/' + filename, function(err) {
//         if (err) return res.status(500).send(err);
//         console.log("sending to uploads");
//         res.redirect('/congrats');
//     });
// });
