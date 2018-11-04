import { List, ListItem, ListItemText } from '@material-ui/core'
import * as React from 'react'
import { Transactions } from '../../store/transactions/interface'

interface Props {
  transactions: Array<Transactions.Transaction>
}

export const RecentTransactionList: React.SFC<Props> = ({ transactions }) => (
  <List component="nav">
    {transactions.map(t => (
      <ListItem key={t.id}>
        <ListItemText primary={t.rawContent} secondary={JSON.stringify(t.details, null, 2)} />
      </ListItem>
    ))}
  </List>
)
