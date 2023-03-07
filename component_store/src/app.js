const express = require('express');
const expressHandlebars = require('express-handlebars');
const path = require('path');
const app = express();

const templateHelper = require('./helpers/templateHelper');
const hbs = expressHandlebars.create(templateHelper.getHandlebarHelpers());

const cors = require('cors');
const fileUpload = require('express-fileupload');
app.use(cors());
const port = process.env.PORT || '3000';

app.use(express.json())
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, '../public')));
app.use('/components', express.static(path.join(__dirname, '../uploads')));

app.set('views', './views');
const uploadsRouter = require('./routes/fileUpload');
const componentDetails = require('./routes/componentDetails');
const apiRouter = require('./routes/api');
const componentList = require('./routes/componentlist');

const logger = require('../logger/select-logger');

app.use(fileUpload());
app.use('/upload', uploadsRouter);
app.use('/api', apiRouter);
app.use('/componentDetails', componentDetails);
app.use('/componentlist', componentList);

app.get('/', (req, res) => {
    logger.info('homepage requested');
    res.render('homepage', {
        url: '/'
    })
})

app.listen(port, () => {
    logger.info(`Server listening on Port: ${port}`);
})