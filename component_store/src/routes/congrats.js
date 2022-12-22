const express = require('express');
const fs = require('fs');
const router = express.Router();
//const files = fs.readdirSync( './uploads');
const Version = require('../models/version');


router.get('/:id', (req, res) => {
    const componentId = req.params.id;
        Version.getComponentNameAndVersionById(componentId)
        .then(rows => {
            const component = rows.length > 0 ? rows[0] : false;
            console.log("component", component);
            res.render("congratulation", {
                component: component,
                name: component.name,
                version: component.version,
                entryFile: component.entry_file,
            })
        })
    .catch(err => {
        if (err) return res.status(500).send(err);
        return next(err);
    })
})


// router.get('/:id', (req, res) => {
//     const componentId = req.params.id;
//     const latestUploadedFile = readFileLocally()
//     .then(uploadedFile => {
//         console.log("uploadedFile", uploadedFile);
//         Version.getComponentNameAndVersionById(componentId)
//         .then(rows => {
//             const component = rows.length > 0 ? rows[0] : false;
//             console.log("component", component);
//             res.render("congratulation", {
//                 component: component,
//                 name: component.name,
//                 version: component.version,
//                 entryFile: component.entry_file,
//                 //files: files,
//                 uploadedFile: uploadedFile
//             })
//         })
//     })
//     .catch(err => {
//         if (err) return res.status(500).send(err);
//         return next(err);
//     });
// })

async function readFileLocally() {
    try {
        const rawdata = await fs.promises.readFile('componentData.json');
        const jsonData = JSON.parse(rawdata)
        return jsonData.component; 
    } catch (err) {
      console.error('Error occurred while reading file!', err);
    }
}


module.exports = router;
































// router.get('/:id', (req, res) => {
//     console.log("request",req.params.id);
//     fs.readFile('componentData.json', (err, data) => {
//         if (err) throw err;
//         const loadedcomponentData = JSON.parse(data);
//         const componentName = loadedcomponentData.componentName;
//         const inputVersion = loadedcomponentData.inputVersion;
//         res.render("congratulation", {
//            // componentName: componentName,
//             //inputVersion: inputVersion,
//            // files: files
//         })
//     });
// })

