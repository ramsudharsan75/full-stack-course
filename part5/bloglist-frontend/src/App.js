import { useState, useEffect } from 'react'

import Blogs from './components/Blogs'
import blogService from './services/blogs'
import loginService from './services/login'
import notificationComponent from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState('')
  const [isError, setIsError] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedUser',
        JSON.stringify(user)
      )

      setNotification(`Logged in as ${user.name}`)
      setIsError(false)
      setTimeout(() => {
        setNotification('')
        setIsError(false)
      }, 3000)

      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotification('Invalid Credentials')
      setIsError(true)
      setTimeout(() => {
        setNotification('')
        setIsError(false)
      }, 3000)
    }
  }

  const handleUsernameChange = (event) => setUsername(event.target.value)
  const handlePasswordChange = (event) => setPassword(event.target.value)

  return (
    <div>
      {notification.length > 0 && notificationComponent(notification, isError)}
      <h2>blogs</h2>
      {user === null
        ? <Togglable buttonLabel='login'>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={handleUsernameChange}
            handlePasswordChange={handlePasswordChange}
            handleSubmit={handleLogin}
          />
        </Togglable>
        : <>
          <div>{user.name} has logged in</div>
          <Blogs setNotification={setNotification} setIsError={setIsError} />
        </>}
    </div>
  )
}

export default App
