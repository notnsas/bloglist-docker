import TogglableBlog from './TogglableBlog'
import { useBlogActions, useUser } from '../store'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Card, Typography, Button, TextField } from '@mui/material'
import useField from '../hooks'

const Blog = ({ blog }) => {
  const { addLike, addComment, deleteBlog } = useBlogActions()
  const comment = useField('text', 'add a comment')
  const user = useUser()

  console.log('blog di blog component', blog)

  const id = useParams().id
  const navigate = useNavigate()

  if (!blog) {
    return null
  }

  const formatUrl = (url) => {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      return `https://${url}`
    }
    return url
  }

  console.log('blog di blog component', blog)

  return (
    <div>
      <Card sx={{ padding: 2, width: '50%', margin: 'auto', marginTop: 5 }}>
        <Typography variant="h4" component="h2">
          {blog.title}
        </Typography>
        <Typography variant="subtitle1" component="h1">
          by {blog.author}
        </Typography>
        <Typography variant="subtitle1" component="h2">
          <a
            href={formatUrl(blog.url)}
            target={'_blank'}
            rel="noopener noreferrer external"
          >
            {blog.url}
          </a>
        </Typography>
        <div>Added by {blog.user.username}</div>
        {typeof user?.id !== 'undefined' &&
          typeof blog?.user?.id !== 'undefined' &&
          user?.id === blog.user.id && (
          <button
            onClick={() => {
              deleteBlog(id)
              navigate('/')
            }}
          >
              remove
          </button>
        )}
        <div style={{ display: 'flex' }}>
          <div style={{ flexGrow: 1 }}></div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 20,
            }}
          >
            <Typography sx={{ marginBottom: '4px' }}>
              {blog.likes} Likes
            </Typography>
            {user && (
              <Button
                onClick={() => {
                  addLike(id)
                }}
                variant="contained"
                color="primary"
              >
                like
              </Button>
            )}
          </div>
        </div>
        <hr />
        <Typography sx={{ marginBottom: '4px' }}>Comments</Typography>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            gap: 10,
          }}
        >
          <TextField id="outlined-basic" variant="outlined" {...comment} />
          <Button
            onClick={() => {
              addComment(id, comment.value)
            }}
            variant="contained"
            color="secondary"
          >
            ADD COMMENT
          </Button>
        </div>
        <ul>
          {blog.comment.map((c) => (
            <li key={c._id}>{c.text}</li>
          ))}
        </ul>
      </Card>
    </div>
  )
}

export default Blog
