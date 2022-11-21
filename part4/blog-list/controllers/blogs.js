const blogsRouter = require('express').Router()

const Blog = require('../models/blog')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
    .populate('author', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const user = request.user
  const blogToDelete = await Blog.findById(request.params.id)

  if (blogToDelete.author.toString() !== user._id.toString()) {
    return response.status(401).json({ error: 'Invalid Author' })
  }

  const deletedBlog = await Blog.findByIdAndDelete(request.params.id)
  user.blogs = user.blogs.filter(blog => blog._id.toString() !== deletedBlog._id.toString())
  await user.save()
  response.json(deletedBlog)
})

blogsRouter.patch('/:id', userExtractor, async (request, response) => {
  const update = request.body
  update.author = request.user
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, {
    $set: update
  }, { new: true })
  response.json(updatedBlog)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user
  body.author = user._id
  const blog = new Blog(body)
  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

module.exports = blogsRouter
