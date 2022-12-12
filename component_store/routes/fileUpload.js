const express = require('express');
const fs = require('fs');
const router = express.Router();

router.get('/', (req, res) => {
    fs.readFile('componentData.json', (err, data) => {
        if (err) throw err;
        const loadedcomponentData = JSON.parse(data);
        const componentName = loadedcomponentData.componentName;
        const inputVersion = loadedcomponentData.inputVersion;
        const filename = loadedcomponentData.sampleFile.name;
        console.log("loadedcomponentData",loadedcomponentData);
            res.render("fileupload", {
                componentName: componentName,
                inputVersion: inputVersion,
            })
    });
});

router.post('/', function(req, res) {
    const componentName = req.body.componentName;
    const inputVersion = req.body.inputVersion;

    let sampleFile = req.files.fileUpload;
    console.log("sampleFile",sampleFile);
    let filename = sampleFile.name;
    
    const componentData = {
        'componentName':componentName,
        'inputVersion': inputVersion,
        'sampleFile': sampleFile
    }
    fs.writeFile('componentData.json', JSON.stringify(componentData), (err) => {  
        if (err) throw err;
        console.log('componentData saved!');
    });
   
    if (!req.files || Object.keys(req.files).length == 0) {
        return res.status(400).send('No files were uploaded.');
    }
    sampleFile.mv('./uploads/' + filename, function(err) {
        if (err) 
        return res.status(500).send(err);
        res.redirect('/upload');
    });
});

module.exports = router;