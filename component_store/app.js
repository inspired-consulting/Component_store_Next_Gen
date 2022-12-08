const express = require('express')
const app = express()

const cors = require('cors')
app.use(cors())

const PORT = 8383;
app.use(express.static('public'))
app.use(express.json())

app.get('/info', (req, res) => {
  res.status(200).json({info: 'hello there again'});
})

app.post('/info', (req, res) => {
  
  const { parcel } = req.body;
  console.log("parcel",parcel);
  if (!parcel){
    return res.status(400).send({status: 'failed'});
  }
  res.status(200).send({status: 'received'});
})

app.listen(PORT, () => {console.log(`Server listening on Port: ${PORT}`)})