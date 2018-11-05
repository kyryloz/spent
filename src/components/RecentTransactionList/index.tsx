import { List, ListItem, ListItemText } from '@material-ui/core'
import * as React from 'react'
import { Commands } from '../../store/commands/interface'

interface Props {
  commands: Array<Commands.Command>
}

export const RecentTransactionList: React.SFC<Props> = ({ commands }) => (
  <List component="nav">
    {commands.map(command => (
      <ListItem key={command.id}>
        <ListItemText primary={command.raw} secondary={JSON.stringify(command.data, null, 2)} />
      </ListItem>
    ))}
  </List>
)
