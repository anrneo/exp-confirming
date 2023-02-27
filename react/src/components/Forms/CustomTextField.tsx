import { InputLabel, OutlinedInput } from '@mui/material'
import React from 'react'

type Props = {
  id?: string
  label: string
  name?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  type?: string
  required?: boolean
  value?: string
}

function CustomTextfield({
  id,
  label,
  name,
  onChange,
  type = 'text',
  required = false,
  value,
}: Props) {
  return (
    <>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <OutlinedInput
        id={id}
        name={name}
        onChange={onChange}
        required={required}
        sx={{ width: '100%' }}
        type={type}
        value={value}
      />
    </>
  )
}

export default CustomTextfield
