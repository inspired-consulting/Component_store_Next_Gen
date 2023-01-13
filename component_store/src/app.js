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
app.use('/components', express.static(path.join(__dirname, '../uploads')));

app.set('views', './views');
const uploadsRouter = require('./routes/fileUpload');
const componentDetails = require('./routes/componentDetails');
const showComponentsRouter = require('./routes/showcomponents');

app.use(fileUpload());
app.use('/upload', uploadsRouter);
app.use('/componentDetails', componentDetails);
app.use('/components', showComponentsRouter);

app.get('/', (req, res) => {
    res.render('homepage', {
        url: '/'
    })
})

app.listen(port, () => {
    console.log(`Server listening on Port: ${port}`)
})