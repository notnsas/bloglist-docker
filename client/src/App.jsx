import { useEffect } from 'react'
import {
  useBlogActions,
  useBlog,
  useUser,
  useUserActions,
  useUsers,
} from './store'
import Blog from './components/Blog'
import CreateNew from './components/CreateNew'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogList from './components/BlogList'
import Login from './components/Login'
import User from './components/User'
import UserList from './components/UserList'
import ErrorFallback from './components/ErrorFallback'
import Catchall from './components/Catchall'
import { ErrorBoundary } from 'react-error-boundary'
import { removeUser } from './services/persistentUser'
import { Routes, Route, Link, useMatch, useNavigate } from 'react-router-dom'
import {
  Container,
  ThemeProvider,
  AppBar,
  Toolbar,
  Button,
  Typography,
  Box,
} from '@mui/material'
import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#00f9dc',
    },
  },
})

const App = () => {
  const blogs = useBlog()
  const user = useUser()
  const users = useUsers()
  const { initializeUser } = useUserActions()
  const { initializeBlog } = useBlogActions()
  const { initializeUsers } = useUserActions()

  const navigate = useNavigate()

  useEffect(() => {
    initializeBlog()
  }, [initializeBlog])

  useEffect(() => {
    initializeUser()
  }, [initializeUser])

  useEffect(() => {
    initializeUsers()
  }, [initializeUsers])

  console.log('user', user)

  const handleLogout = () => {
    removeUser()
    window.location.reload()
    navigate('/')
  }


  const matchBlogs = useMatch('/blogs/:id')
  const matchUsers = useMatch('/users/:id')

  const blog = matchBlogs
    ? blogs.find((note) => note.id === matchBlogs.params.id)
    : null
  const userToShow = matchUsers
    ? users.find((user) => user.id === matchUsers.params.id)
    : null

  console.log('userToShow', userToShow)
  console.log('users', users)

  const hoverStyle = {}
  return (
    <ThemeProvider theme={theme} disableGutters>
      <Container style={{ width: 'full' }} maxWidth={false} disableGutters>
        <Box sx={{ flexGrow: 1, marginBottom: 3 }}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Blogs
              </Typography>
              <Button color="inherit" component={Link} to="/" sx={hoverStyle}>
                blogs
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/users"
                sx={hoverStyle}
              >
                users
              </Button>
              {!user && (
                <Button
                  color="inherit"
                  component={Link}
                  to="/login"
                  sx={hoverStyle}
                >
                  login
                </Button>
              )}
              {user && (
                <>
                  <Button
                    color="inherit"
                    component={Link}
                    to="/create"
                    sx={hoverStyle}
                  >
                    new blog
                  </Button>
                  <Button
                    color="inherit"
                    onClick={handleLogout}
                    sx={hoverStyle}
                  >
                    Logout
                  </Button>
                </>
              )}
            </Toolbar>
          </AppBar>
        </Box>

        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onError={() => {
            console.log('ada error')
          }}
        >
          <Notification />

          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/create" element={<CreateNew />} />
            <Route path="/" element={<BlogList />} />
            <Route path="/blogs/:id" element={<Blog blog={blog} />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/users/:id" element={<User user={userToShow} />} />
            <Route path="*" element={<Catchall />} />
          </Routes>
        </ErrorBoundary>
      </Container>
    </ThemeProvider>
  )
}

export default App
