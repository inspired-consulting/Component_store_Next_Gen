const express = require('express');
const fs = require('fs');
const router = express.Router();
const Component = require('../models/component');
const Version = require('../models/version');

router.get('/', (req, res) => {
    res.render("fileupload", {})
});

router.post('/', (req, res, next) => {
    const data = req.body;
    const sampleFile = req.files.fileUpload;
    const filename = sampleFile.name;
    console.log("sampleFile", sampleFile);
    console.log("filename", filename);

    const componentData = {
        'component': filename
    }
    fs.writeFile('componentData.json', JSON.stringify(componentData), (err) => {
        if (err) throw err;
        console.log('componentData saved!');
    });
    if (!req.files || Object.keys(req.files).length == 0) {
        return res.status(400).send('No files were uploaded.');
    }

    Component.createComponent(data)
    .then(result => {
        Version.createVersion(data, result)
        .then(id => {
            sampleFile.mv('./uploads/' + filename, function(err) {
                if (err) return res.status(500).send(err);
                console.log("sending to uploads");
                return res.redirect(`/congrats/${id}`);
            });
        })
    })
    .catch(err => {
        if (err) return res.status(500).send(err);
        return next(err);
    })
});



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

module.exports = router;