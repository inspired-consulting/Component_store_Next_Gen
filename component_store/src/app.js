const express = require('express');
const expressHandlebars = require('express-handlebars');
const path = require('path');
const app = express();
const hbs = expressHandlebars.create({
    partialsDir: 'views/partials/',
    helpers: {
        getCurrentUrl (req, str) {
            return str === req.url || str === req.sort;
        },
        json: (context) => {
            return JSON.stringify(context);
        },
        add: (a, b) => {
            return a + b;
        },
        eq: (a, b) => {
            return a === b;
        },
        neq: (a, b) => {
            return a !== b;
        },
        ifeq: (a, b, options) => {
            if (a instanceof Number && b instanceof Number) {
                // eslint-disable-next-line eqeqeq
                return a == b;
            }
            // eslint-disable-next-line eqeqeq
            if (a == b) { return options.fn(this); }
            return options.inverse(this);
        },
        isEmpty: (list) => {
            // eslint-disable-next-line eqeqeq
            return (list == null || list === undefined || list.length == 0)
        },
        gt: (a, b) => {
            // eslint-disable-next-line eqeqeq
            if (a == undefined) return false;
            return (a > b);
        },
        link: (path) => {
            return path;
        },
        searchParams: (query, offset) => {
            return exports.linkParams(query, offset);
        }
    }
});
exports.linkParams = (query, offset) => {
    // eslint-disable-next-line no-undef
    return linkParams(query, offset);
}
const linkParams = (query, offset) => {
    const queryParams = [
        { key: 'q', value: query },
        { key: 'offset', value: offset }
    ]
    // eslint-disable-next-line no-undef
    return buildQueryParamsString(queryParams)
}

const buildQueryParamsString = (queryParamsArray) => {
    let queryParams = '?'
    queryParamsArray.forEach(({ key, value }) => {
        queryParams = value ? queryParams + `${key}=${value}&` : queryParams
    })
    return queryParams.endsWith('&') ? queryParams.substring(0, queryParams.length - 1) : queryParams;
}

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
const componentList = require('./routes/componentlist');

app.use(fileUpload());
app.use('/upload', uploadsRouter);
app.use('/componentDetails', componentDetails);
app.use('/componentlist', componentList);

app.get('/', (req, res) => {
    res.render('homepage', {
        url: '/'
    })
})

app.listen(port, () => {
    console.log(`Server listening on Port: ${port}`)
})