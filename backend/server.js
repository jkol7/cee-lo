const express = require('express')
const dotenv = require('dotenv').config()
const PORT = process.env.PORT || 5000

const app = express()

app.use('/', require('./routes/gameRoutes'))

app.listen(PORT, () => console.log(`Server started on ${PORT}`))


