import { useState } from 'react'

const useField = (type, label) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    label,
    value,
    onChange,
  }
}

export default useField
