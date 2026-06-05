import { Alert } from '@mui/material'
import { useNotification, useNotificationType } from '../store'
const Notification = () => {
  const message = useNotification()
  const type = useNotificationType()

  if (!message) {
    return null
  }

  return (
    <Alert
      sx={{ marginY: 2 }}
      severity={type === 'error' ? 'error' : 'success'}
    >
      {message}
    </Alert>
  )
}

export default Notification
