import { ListItem, ListItemText } from '@material-ui/core'
import * as React from 'react'
import { Transactions } from '../../../store/transactions/interface'
import { Expense } from './Expense'

export const createWidget = (transaction: Transactions.Transaction) => {
  switch (transaction.details.transactionType) {
    case Transactions.TransactionType.CREATE: {
      const details = transaction.details as Transactions.Create

      return (
        <ListItem>
          <ListItemText
            primary={transaction.rawContent}
            secondary={`'${details.name}' ${details.entity} created`}
          />
        </ListItem>
      )
    }
    case Transactions.TransactionType.EXPENSE: {
      return <Expense transaction={transaction as Transactions.Transaction<Transactions.Expense>} />
    }
    case Transactions.TransactionType.INCOME: {
      const details = transaction.details as Transactions.Income

      return (
        <ListItem>
          <ListItemText
            primary={transaction.rawContent}
            secondary={`Income $${details.amount} to '${details.accountName}' recorded`}
          />
        </ListItem>
      )
    }
    case Transactions.TransactionType.STATUS: {
      return (
        <ListItem>
          <ListItemText primary={transaction.rawContent} />
        </ListItem>
      )
    }
    default: {
      return (
        <ListItem>
          <ListItemText
            primary={transaction.rawContent}
            secondary={JSON.stringify(transaction.details, null, 2)}
          />
        </ListItem>
      )
    }
  }
}
