const express = require('express');

const router = express.Router();
const Version = require('../models/version');

router.get('/:id', (req, res) => {
    const componentId = req.params.id;
    Version.getComponentNameAndVersionById(componentId)
        .then((rows) => {
            const component = rows.length > 0 ? rows[0] : false;
            console.log('component with ID', component);
            res.render('congratulation', {
                component: component,
                name: component.name,
                version: component.version,
                entryFile: component.entry_file,
            });
        })
        .catch((err) => {
            if (err) return res.status(500).send(err);
            // eslint-disable-next-line no-undef
            return next(err);
        });
});

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

// async function readFileLocally() {
//     try {
//         const rawdata = await fs.promises.readFile('componentData.json');
//         const jsonData = JSON.parse(rawdata)
//         return jsonData.component;
//     } catch (err) {
//       console.error('Error occurred while reading file!', err);
//     }
// }

module.exports = router;
