import { Link } from 'react-router-dom'
import { useBlog } from '../store'
import Blog from './Blog'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { Fragment } from 'react'
import { Box, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const BlogList = () => {
  const blogs = useBlog()

  const navigate = useNavigate()
  console.log('blog di bloglist', blogs)

  return (
    <div>
      {/* <h2 style={{ margin: "auto", width: "fit-content" }}>blogs</h2> */}
      <Box
        sx={{
          width: '100%',
          maxWidth: 360,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 1,
          p: 1,
          margin: 'auto',
        }}
      >
        <List component="nav" aria-label="list of blogs">
          <ListItemButton
            sx={{
              bgcolor: 'secondary.main',
              color: 'secondary.contrastText',
              borderRadius: 2,
              mb: 1,

              '&:hover': {
                bgcolor: 'secondary.dark',
              },
            }}
          >
            <ListItemText primary="Blogs" sx={{ textAlign: 'center' }} />
          </ListItemButton>
          {blogs.map((blog) => (
            <ListItemButton
              onClick={(event) => {
                event.preventDefault()
                navigate(`/blogs/${blog.id}`)
              }}
              key={blog.id}
            >
              <ListItemText
                inset
                primary={`${blog.title}`}
                secondary={
                  <Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      sx={{ color: 'text.primary', display: 'inline' }}
                    >
                      {blog.author}
                    </Typography>
                    {` — ${blog.url}`}
                  </Fragment>
                }
              />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </div>
  )
}

export default BlogList
