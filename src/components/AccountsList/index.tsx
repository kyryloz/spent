import { List, ListItem, ListItemText } from '@material-ui/core'
import * as React from 'react'
import { Accounts } from '../../store/accounts/interface'

interface Props {
  accounts: Array<Accounts.Account>
}

export const AccountsList: React.SFC<Props> = ({ accounts }) => (
  <div>
    <List component="nav">
      {accounts.map(account => (
        <ListItem key={account.id}>
          <ListItemText primary={`${account.name}`} />
        </ListItem>
      ))}
    </List>
  </div>
)
