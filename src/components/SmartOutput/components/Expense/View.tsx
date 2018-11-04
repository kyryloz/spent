import { ListItem, ListItemText } from '@material-ui/core'
import * as React from 'react'
import { ViewProps } from '.'

export const View: React.SFC<ViewProps> = ({ transaction }) => (
  <ListItem>
    <ListItemText
      primary={`> ${transaction.rawContent}`}
      secondary={`Expence $${transaction.details.amount} on '${transaction.details.category}' recorded`}
    />
  </ListItem>
)
