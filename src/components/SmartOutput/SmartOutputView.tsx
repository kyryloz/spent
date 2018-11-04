import { List, ListItem, ListItemText } from '@material-ui/core'
import * as React from 'react'
import { ViewProps } from '.'

export const SmartOutputView: React.SFC<ViewProps> = ({ transactions }) => (
  <List component="nav">
    {transactions.map(t => (
      <ListItem key={t.id}>
        <ListItemText primary={t.rawContent} secondary={JSON.stringify(t.details, null, 2)} />
      </ListItem>
    ))}
  </List>
)
