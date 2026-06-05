import { TextField, Button, Card } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useUserActions } from '../store'
import useField from '../hooks'

const Login = () => {
  const username = useField('text', 'username')
  const password = useField('password', 'password')

  const { login } = useUserActions()

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
        <h2>log in to application</h2>

        <form
          onSubmit={async (event) => {
            event.preventDefault()
            const user = await login(username.value, password.value)
            console.log('user', user)
            if (user) {
              navigate('/')
            }
          }}
          style={{
            padding: 4,
            // width: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            gap: 10,
          }}
        >
          <div>
            <TextField {...username} />
          </div>

          <div>
            <TextField {...password} />
          </div>
          <Button type="submit" variant="contained" style={{ marginTop: 10 }}>
            login
          </Button>
          {/* <button type="submit">login</button> */}
        </form>
      </Card>
    </div>
  )
}

export default Login
