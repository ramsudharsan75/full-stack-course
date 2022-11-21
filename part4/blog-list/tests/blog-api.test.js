const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.bulkSave(helper.initialBlogs.map(blog => new Blog(blog)))
}, 100000)

describe('testing authentication for blog creation', () => {
  test('a request to create new blog without authentication token fails', async () => {
    const newBlog = {
      title: 'new random title',
      url: 'XYZ',
      likes: 100
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'new random title',
      url: 'Ram',
      likes: 100
    }

    await api
      .post('/api/blogs')
      .auth('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlJhbSIsImlkIjoiNjM3YmJiZDQyZTU0NDk3YmU1MmY5MmU1IiwiaWF0IjoxNjY5MDU0OTc0LCJleHAiOjE2NjkwNTg1NzR9.EN4ZBN7-I9XFJ3CB66xzxgnDScTI2qPUBNI2Tyh5xd4'
        , {
          type: 'bearer'
        })
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const titles = response.body.map(blog => blog.title)

    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    expect(titles).toContain(
      'new random title'
    )
  })

  test('update blog info with id', async () => {
    const existingBlogs = await helper.blogsInDb()
    const firstBlog = existingBlogs[0]
    const update = {
      likes: 500
    }
    const response = await api
      .patch(`/api/blogs/${firstBlog.id}`)
      .auth('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlJhbSIsImlkIjoiNjM3YmJiZDQyZTU0NDk3YmU1MmY5MmU1IiwiaWF0IjoxNjY5MDU0OTc0LCJleHAiOjE2NjkwNTg1NzR9.EN4ZBN7-I9XFJ3CB66xzxgnDScTI2qPUBNI2Tyh5xd4'
        , {
          type: 'bearer'
        })
      .send(update)

    expect(response.body.likes).toEqual(update.likes)
  })

  test('blog likes defaults to 0', async () => {
    const testBlog = {
      title: 'title xyz',
      url: 'Ram'
    }

    const response = await api
      .post('/api/blogs').send(testBlog)
      .auth('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlJhbSIsImlkIjoiNjM3YmJiZDQyZTU0NDk3YmU1MmY5MmU1IiwiaWF0IjoxNjY5MDU0OTc0LCJleHAiOjE2NjkwNTg1NzR9.EN4ZBN7-I9XFJ3CB66xzxgnDScTI2qPUBNI2Tyh5xd4'
        , {
          type: 'bearer'
        })
    expect(response.body).toHaveProperty('likes')
    expect(response.body.likes).toEqual(0)
  })

  test('blog can be deleted with id', async () => {
    const existingBlogs = await helper.blogsInDb()
    const response = await api
      .delete(`/api/blogs/${existingBlogs[0].id}`)
      .auth('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlJhbSIsImlkIjoiNjM3YmJiZDQyZTU0NDk3YmU1MmY5MmU1IiwiaWF0IjoxNjY5MDU0OTc0LCJleHAiOjE2NjkwNTg1NzR9.EN4ZBN7-I9XFJ3CB66xzxgnDScTI2qPUBNI2Tyh5xd4'
        , {
          type: 'bearer'
        })
    const deletedBlog = response.body
    expect(deletedBlog.id).toEqual(existingBlogs[0].id)
  })

  test('blog without title or url cannot be added', async () => {
    const newBlog = {
      author: 'Ram',
      likes: 100
    }

    await api
      .post('/api/blogs')
      .auth('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlJhbSIsImlkIjoiNjM3YmJiZDQyZTU0NDk3YmU1MmY5MmU1IiwiaWF0IjoxNjY5MDU0OTc0LCJleHAiOjE2NjkwNTg1NzR9.EN4ZBN7-I9XFJ3CB66xzxgnDScTI2qPUBNI2Tyh5xd4'
        , {
          type: 'bearer'
        })
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  }, 100000)
})

test('blogs are returned as json', async () => {
  await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 100000)

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
}, 100000)

test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body.map(blog => blog.title)).toContain('ABC')
}, 100000)

test('id property exists in all blogs', async () => {
  const response = await api.get('/api/blogs')
  response.body.map(blog => expect(blog.id).toBeDefined())
})

afterAll(() => mongoose.connection.close())
