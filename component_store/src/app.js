const express = require('express');
const expressHandlebars = require('express-handlebars');
const path = require('path');
const app = express();
const hbs = expressHandlebars.create({
    partialsDir: 'views/partials/',
    helpers: {
        getCurrentUrl (req, str) { return str === req.url || str === req.sort; }
    }
});
const cors = require('cors');
const fileUpload = require('express-fileupload');
app.use(cors());
const port = process.env.PORT || '8383';

app.use(express.json())
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, '../public')));
// app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use('/components', express.static(path.join(__dirname, '../uploads')));

app.set('views', './views');

const InfoRouter = require('./routes/info');
const UploadsRouter = require('./routes/fileUpload');
const congratulationRouter = require('./routes/congrats');
const showComponentsRouter = require('./routes/showcomponents');

app.use(fileUpload());
app.use('/info', InfoRouter);
app.use('/upload', UploadsRouter);
app.use('/congrats', congratulationRouter);
app.use('/components/list', showComponentsRouter);

app.get('/', (req, res) => {
    res.render('index', {
        url: '/'
    })
})

app.listen(port, () => {
    console.log(`Server listening on Port: ${port}`)
})