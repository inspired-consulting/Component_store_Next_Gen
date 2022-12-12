const express = require('express');
const fs = require('fs');
const router = express.Router();

router.get('/', (req, res) => {
    fs.readFile('componentData.json', (err, data) => {
		if (err) throw err;
		const loadedcomponentData = JSON.parse(data);
		console.log("loadedcomponentData",loadedcomponentData.componentName);
		const componentName = loadedcomponentData.componentName;
		const inputVersion = loadedcomponentData.inputVersion;
		res.render("congratulation", {
			componentName: componentName,
			inputVersion: inputVersion,
		})
	});
})


module.exports = router;