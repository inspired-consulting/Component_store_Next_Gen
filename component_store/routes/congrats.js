const express = require('express');
const fs = require('fs');
const router = express.Router();
const files = fs.readdirSync( './uploads');
console.log("files from folder",files);

router.get('/', (req, res) => {
    fs.readFile('componentData.json', (err, data) => {
        if (err) throw err;
        const loadedcomponentData = JSON.parse(data);
        // console.log("loadedcomponentData",loadedcomponentData.componentName);
        const componentName = loadedcomponentData.componentName;
        const inputVersion = loadedcomponentData.inputVersion;
        res.render("congratulation", {
            componentName: componentName,
            inputVersion: inputVersion,
            files: files
        })
    });
})

module.exports = router;