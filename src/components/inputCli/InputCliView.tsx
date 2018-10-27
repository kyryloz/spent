import { TextField } from '@material-ui/core'
import * as React from 'react'
import { ChangeEvent } from 'react'
import './styles.css'

interface OwnProps {
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void
  input: string
  handleInputSubmit: () => void
}

export const InputCliView: React.SFC<OwnProps> = ({
  input,
  handleInputChange,
  handleInputSubmit,
}) => (
  <TextField
    id="inputCli"
    variant="outlined"
    label="Process money flow"
    onChange={handleInputChange}
    value={input}
    onKeyPress={ev => {
      if (ev.key === 'Enter') {
        handleInputSubmit()
        ev.preventDefault()
      }
    }}
  />
)
