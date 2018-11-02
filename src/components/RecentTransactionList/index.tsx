import { List, ListItem, ListItemText } from '@material-ui/core'
import * as React from 'react'
import { Transactions } from '../../store/transactions/interface'

interface Props {
  transactions: Array<Transactions.Transaction<Transactions.TransactionPayload>>
}

export const RecentTransactionList: React.SFC<Props> = ({ transactions }) => (
  <div>
    <List component="nav">
      {transactions.map(t => (
        <ListItem key={t.id}>
          <ListItemText primary={`${t.data.type}: ${t.rawContent}`} secondary={JSON.stringify(t.data, null, 2)} />
        </ListItem>
      ))}
    </List>
  </div>
)
