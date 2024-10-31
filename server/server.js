const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const cors = require('cors')
require('dotenv').config()

const partnerRoutes = require('./routes/partnerRoutes')
const queryRoutes = require("./routes/queryRoutes")
const twilioRoutes = require("./routes/twilioRoutes")

const app = express()

app.use(cors({ origin: '*' }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

mongo_URL = process.env.mongo_URL
const port = process.env.PORT

mongoose
  .connect(mongo_URL)
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB Atlas:", error);
  });

app.use('/', partnerRoutes)
app.use("/", queryRoutes)
app.use("/", twilioRoutes)

app.listen(port, () => {
  console.log(`App running on port ${port}...`)
})

module.exports = app