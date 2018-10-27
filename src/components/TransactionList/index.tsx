import { List, ListItem, ListItemText } from '@material-ui/core'
import * as React from 'react'
import { Transaction } from '../../store/transactionList/interface'

interface Props {
  transactions: Array<Transaction>
}

export const TransactionList: React.SFC<Props> = ({ transactions }) => (
  <div>
    <List component="nav">
      {transactions.map(t => (
        <ListItem key={t.id}>
          <ListItemText title={t.content} primary={t.content} />
        </ListItem>
      ))}
    </List>
  </div>
)
