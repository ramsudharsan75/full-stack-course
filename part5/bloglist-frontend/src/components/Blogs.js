import { useState, useEffect, useRef } from 'react'

import blogService from '../services/blogs'
import BlogForm from './BlogForm'
import Togglable from './Togglable'

const Blog = ({ blog, setNotification, setIsError, updateBlogs }) => {
  const [likes, setLikes] = useState(blog.likes)

  const likesHandler = async () => {
    try {
      const updatedBlog = await blogService.updateLikes(blog.id, { likes: likes + 1 })
      setLikes(updatedBlog.likes)
      setNotification('Liked blog successfully')
      setTimeout(() => {
        setNotification('')
      }, 3000)
      updateBlogs()
    } catch (error) {
      setNotification(`Unable to update likes: ${error}`)
      setIsError(true)
      setTimeout(() => {
        setNotification('')
        setIsError(false)
      }, 3000)
    }
  }

  const deleteHandler = async () => {
    try {
      const confirm = window.confirm('Are you sure you want to delete?')
      if (confirm) {
        await blogService.deleteBlog(blog.id)
        updateBlogs()
        setNotification('Deleted blog successfully')
        setTimeout(() => {
          setNotification('')
        }, 3000)
      }
    } catch (error) {
      setNotification(`Unable to delete blog: ${error}`)
      setIsError(true)
      setTimeout(() => {
        setNotification('')
        setIsError(false)
      }, 3000)
    }
  }

  return (
    <div className='blog'>
      <span>{blog.title} {blog.author?.username} <span id='likes'>{likes}</span></span>
      <button id='like-button' onClick={likesHandler}>Like</button>
      <button id='delete-button' onClick={deleteHandler}>Delete</button>
    </div>
  )
}

const Blogs = ({ setNotification, setIsError }) => {
  const [blogs, setBlogs] = useState([])
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs.sort((b1, b2) => b2.likes - b1.likes)))
  }, [])

  const handleTitle = (event) => setTitle(event.target.value)
  const handleUrl = (event) => setUrl(event.target.value)

  const blogFormRef = useRef()

  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm
        onSubmit={handleCreateBlog}
        handleTitle={handleTitle}
        handleUrl={handleUrl}
        titleValue={title}
        urlValue={url}
      />
    </Togglable>
  )

  const handleCreateBlog = async (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()
    try {
      const insertedBlog = await blogService.createBlog({
        title,
        url
      })
      setNotification(`created new blog: ${insertedBlog.title}`)
      setIsError(false)
      setTimeout(() => {
        setNotification('')
        setIsError(false)
      }, 3000)
      setBlogs(blogs.concat(insertedBlog))
    } catch (error) {
      setNotification(`Unable to create new blog: ${error}`)
      setIsError(true)
      setTimeout(() => {
        setNotification('')
        setIsError(false)
      }, 3000)
    }

    setTitle('')
    setUrl('')
  }

  const updateBlogs = () => {
    blogService.getAll().then(blogs => setBlogs(blogs.sort((b1, b2) => b2.likes - b1.likes)))
  }

  return (
    <div>
      {blogs.map((blog) => (
        <Blog key={blog.id}
          blog={blog}
          setNotification={setNotification}
          setIsError={setIsError} updateBlogs={updateBlogs}
        />
      ))}
      {blogForm()}
    </div>
  )
}

export default Blogs
