const express = require('express');
const fs = require('fs');
const router = express.Router();
const files = fs.readdirSync( './uploads');
const Version = require('../models/version');
console.log("files from folder",files);

const rawdata = fs.readFileSync('componentData.json');
const jsonData = JSON.parse(rawdata)
console.log("jsonData", jsonData);


router.get('/:id', (req, res) => {
    const componentId = req.params.id;
    Version.GetComponentNameAndVersionById(componentId)
    .then(component => {
        res.render("congratulation", {
            component: component,
            files: files,
            jsonData: jsonData.component
        })
    })
    .catch(err => {
        if (err) return res.status(500).send(err);
        return next(err);
    });
})



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

module.exports = router;