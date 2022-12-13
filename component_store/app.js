const express = require('express');
const expressHandlebars = require('express-handlebars');
const app = express();
var hbs = expressHandlebars.create({});
var path = require('path');
const cors = require('cors');
const fileUpload = require('express-fileupload');
app.use(cors());
const port = process.env.PORT || '8383';

app.use(express.json())
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, './public')));
app.use('/uploads', express.static(path.join(__dirname, './uploads')));

app.set('views', './views');

const InfoRouter = require('./routes/info');
const UploadsRouter = require('./routes/fileUpload');
const congratulationRouter = require('./routes/congrats');

app.use(fileUpload());
app.use('/info', InfoRouter);
app.use('/upload', UploadsRouter);
app.use('/congrats', congratulationRouter);

app.get('/', (req, res) => {
	res.render("index", { 
	})
})

app.listen(port, () => {
	console.log(`Server listening on Port: ${port}`)
})