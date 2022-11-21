const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'ABC',
    author: '637bbbd42e54497be52f92e5',
    url: 'ABC',
    likes: 0
  },
  {
    title: 'new Title',
    author: '637bbbd42e54497be52f92e5',
    url: 'ABC',
    likes: 0
  },
  {
    title: 'new Title 1',
    author: '637bbbd42e54497be52f92e5',
    url: 'ABC',
    likes: 0
  }
]

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'will remove this soon',
    author: '637bbbd42e54497be52f92e5',
    url: 'Ram',
    likes: 0
  })

  await blog.save()
  await blog.remove()
  return blog._id.toString()
}

const blogsInDb = async () => {
  const notes = await Blog.find({})
  return notes.map(note => note.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb
}
