const express = require('express');
const app = express();
const cors = require('cors');
const fileUpload = require('express-fileupload');
app.use(cors());
app.use(express.json())

const port = process.env.PORT || '8383';
app.use(express.static('views'))

app.use(fileUpload());

const InfoRouter = require('./routes/info');
const UploadsRouter = require('./routes/uploads');

app.use('/info', InfoRouter);
app.use('/upload', UploadsRouter);

app.listen(port, () => {
	console.log(`Server listening on Port: ${port}`)
})