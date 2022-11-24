import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = userToken => {
  token = `bearer ${userToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const createBlog = async (blogData) => {
  const options = {
    headers: {
      authorization: token
    }
  }

  const response = await axios.post(baseUrl, blogData, options)
  return response.data
}

const updateLikes = async (blogId, likesData) => {
  const options = {
    headers: {
      authorization: token
    }
  }

  const response = await axios.patch(`${baseUrl}/${blogId}`, likesData, options)
  return response.data
}

const deleteBlog = async (blogId) => {
  const options = {
    headers: {
      authorization: token
    }
  }

  const response = await axios.delete(`${baseUrl}/${blogId}`, options)
  return response.data
}

export default { getAll, setToken, createBlog, updateLikes, deleteBlog }
