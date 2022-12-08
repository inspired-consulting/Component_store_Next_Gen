const express = require('express');
const router = express.Router();

router.post('/', function(req, res) {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }
    console.log("files",req.files);
    let sampleFile = req.files.fileUpload;
    let filename = sampleFile.name;
    console.log("filename",filename);

   // Use the mv() method to place the file somewhere on your server
    sampleFile.mv('./uploads/' + filename, function(err) {
      if (err)
        return res.status(500).send(err);
        res.send('File uploaded!');
    });
});

module.exports = router;