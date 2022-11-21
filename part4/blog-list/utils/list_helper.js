const dummy = (blogs) => {
  // ...
  return 1
}

const totalLikes = (blogs) => blogs.length === 1
  ? blogs[0].likes
  : blogs.reduce((totalLikes, blog) => totalLikes + blog.likes, 0)

const favoriteBlog = (blogs) =>
  blogs.length === 1
    ? blogs[0]
    : blogs.reduce((prev, blog) => blog.likes >= prev.likes ? blog : prev, { likes: 0 })

const authorWithMostBlogs = (blogs) => {
  const mem = {}
  let maxAuthor = null
  let maxBlogs = 0

  blogs.forEach(blog => {
    blog.author in mem ? mem[blog.author]++ : (mem[blog.author] = 1)

    if (mem[blog.author] >= maxBlogs) {
      maxBlogs = mem[blog.author]
      maxAuthor = blog.author
    }
  })

  return JSON.stringify({
    author: maxAuthor,
    blogs: maxBlogs
  })
}

const authorWithMostLikes = (blogs) => {
  const mem = {}
  let maxAuthor = null
  let maxLikes = 0

  blogs.forEach(blog => {
    blog.author in mem ? (mem[blog.author] += blog.likes) : (mem[blog.author] = blog.likes)

    if (mem[blog.author] >= maxLikes) {
      maxLikes = mem[blog.author]
      maxAuthor = blog.author
    }
  })

  return JSON.stringify({
    author: maxAuthor,
    likes: maxLikes
  })
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  authorWithMostBlogs,
  authorWithMostLikes
}
