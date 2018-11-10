import { ListItem, ListItemText } from '@material-ui/core'
import * as React from 'react'
import { Commands } from '../../../store/commands/interface'
import { CreateAccount } from './CreateAccount'
import { CreateCategory } from './CreateCategory'
import { Expense } from './Expense'
import { Income } from './Income'

export const createWidget = (command: Commands.CommandData) => {
  switch (command.data.dataType) {
    case Commands.DataType.CREATE_ACCOUNT: {
      return <CreateAccount command={command as Commands.CreateAccountData} />
    }
    case Commands.DataType.CREATE_CATEGORY: {
      return <CreateCategory command={command as Commands.CreateCategoryData} />
    }
    case Commands.DataType.EXPENSE: {
      return <Expense command={command as Commands.ExpenseData} />
    }
    case Commands.DataType.INCOME: {
      return <Income command={command as Commands.IncomeData} />
    }
    case Commands.DataType.STATUS: {
      return (
        <ListItem>
          <ListItemText primary={command.raw} />
        </ListItem>
      )
    }
    default: {
      return (
        <ListItem>
          <ListItemText primary={command.raw} secondary={JSON.stringify(command.data, null, 2)} />
        </ListItem>
      )
    }
  }
}
