const express = require('express');
const fs = require('fs');
const router = express.Router();


router.get('/', (req, res) => {
    fs.readFile('componentData.json', (err, data) => {
        if (err) throw err;
        const loadedcomponentData = JSON.parse(data);
        const componentName = loadedcomponentData.componentName;
        const inputVersion = loadedcomponentData.inputVersion;
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
    let filename = sampleFile.name;

    const componentData = {
        'componentName':componentName,
        'inputVersion': inputVersion,
    }
    
    fs.writeFile('componentData.json', JSON.stringify(componentData), (err) => {  
        if (err) throw err;
        console.log('componentData saved!');
    });
   
    if (!req.files || Object.keys(req.files).length == 0) {
        return res.status(400).send('No files were uploaded.');
    }
    sampleFile.mv('./uploads/' + filename, function(err) {
        if (err) return res.status(500).send(err);
        console.log("sending to uploads");
        res.redirect('/congrats');
    });
});

module.exports = router;