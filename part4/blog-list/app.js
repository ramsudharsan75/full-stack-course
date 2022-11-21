const express = require('express')
require('express-async-errors')
const cors = require('cors')
const mongoose = require('mongoose')

const { info, error } = require('./utils/logger')
const { MONGO_URI } = require('./utils/config')
const blogsRouter = require('./controllers/blogs')
const { errorHandler, unkownRouteHandler, tokenExtractor } = require('./utils/middleware')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

info('Connecting to Mongo...')
mongoose
  .connect(MONGO_URI)
  .then(() => info('Connected to Mongo...'))
  .catch(err => error('Error connecting Mongo', err.message))

const app = express()

app.use(cors())
app.use(express.json())

app.use(tokenExtractor)
app.use('/api/login', loginRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', userRouter)
app.use(unkownRouteHandler)
app.use(errorHandler)

module.exports = app
