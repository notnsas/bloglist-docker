import { useNavigate } from 'react-router-dom'
import { TextField, Button, Card } from '@mui/material'
import { useBlogActions } from '../store'
import useField from '../hooks'

const CreateNew = () => {
  const { add } = useBlogActions()
  const title = useField('text', 'title')
  const author = useField('text', 'author')
  const url = useField('text', 'url')

  const navigate = useNavigate()

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Card
        variant="outlined"
        sx={{
          paddingX: '100px',
          paddingY: '50px',
          width: 'fit',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          gap: 1,
          borderRadius: '20px',
        }}
      >
        <h2>create new</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            // handleCreate({ title, author, url })
            add({ title: title.value, author: author.value, url: url.value })
            navigate('/')
          }}
          style={{
            padding: 4,
            // width: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            gap: 14,
          }}
        >
          <div>
            <TextField {...title} />
          </div>
          <div>
            <TextField {...author} />
          </div>
          <div>
            <TextField {...url} />
          </div>
          <Button type="submit" variant="contained" style={{ marginTop: 10 }}>
            create
          </Button>
        </form>
      </Card>
    </div>
  )
}

export default CreateNew
