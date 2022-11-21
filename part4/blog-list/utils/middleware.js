const jwt = require('jsonwebtoken')

const logger = require('./logger')
const User = require('../models/user')

const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({
      error: 'malformatted id'
    })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({
      error: error.message
    })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'invalid token' })
  } else if (error.name === 'SyntaxError') {
    return response.status(401).json({ error: 'syntax error' })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({ error: 'token expired' })
  }

  logger.error(error.message)
  next(error)
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  }
  next()
}

const userExtractor = async (request, response, next) => {
  if (request.token) {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (decodedToken) {
      const user = await User.findById(decodedToken.id)
      if (!user || user.length === 0) {
        return response.status(401).json({ error: 'user not found or invalid token' })
      }
      request.user = user
      next()
    }
  } else {
    return response.status(401).json({ error: 'user not found or invalid token' })
  }
}

const unkownRouteHandler = (request, response) => response.status(404).json({ error: 'unkown page accessed' })

module.exports = {
  errorHandler,
  unkownRouteHandler,
  tokenExtractor,
  userExtractor
}
