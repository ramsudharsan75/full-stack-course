const listHelper = require('../utils/list_helper')

test('dummy return one', () => expect(listHelper.dummy([])).toBe(1))

const testBlogs = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    likes: 12
  },
  {
    title: 'Canonical string reduction',
    author: 'Ram',
    likes: 12
  },
  {
    title: 'Canonical string reduction',
    author: 'Ram',
    likes: 12
  }
]

describe('total likes', () => {
  test('finds sum of all likes', () => {
    const result = listHelper.totalLikes(testBlogs)
    expect(result).toBe(41)
  })
})

describe('favorite blog', () => {
  test('finds the last most favorite blog', () => {
    expect(listHelper.favoriteBlog(testBlogs))
      .toBe(testBlogs[3])
  })
})

describe('author with most blogs', () => {
  test('finds the last author with most blogs', () => {
    expect(listHelper.authorWithMostBlogs(testBlogs))
      .toBe(JSON.stringify({
        author: 'Ram',
        blogs: 2
      }))
  })
})

describe('author with most likes', () => {
  test('finds the last author with most likes', () => {
    expect(listHelper.authorWithMostLikes(testBlogs))
      .toBe(JSON.stringify({
        author: 'Ram',
        likes: 24
      }))
  })
})
