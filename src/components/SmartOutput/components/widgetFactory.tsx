import { ListItem, ListItemText } from '@material-ui/core'
import * as React from 'react'
import { Commands } from '../../../store/commands/interface'
import { Expense } from './Expense'

export const createWidget = (command: Commands.Command) => {
  switch (command.commandType) {
    case Commands.CommandType.CREATE_ACCOUNT: {
      const details = command as Commands.CreateAccount

      return (
        <ListItem>
          <ListItemText
            primary={details.raw}
            secondary={`'${details.data.name}' account created`}
          />
        </ListItem>
      )
    }
    case Commands.CommandType.CREATE_CATEGORY: {
      const details = command as Commands.CreateCategory

      return (
        <ListItem>
          <ListItemText
            primary={details.raw}
            secondary={`'${details.data.name}' account created`}
          />
        </ListItem>
      )
    }
    case Commands.CommandType.EXPENSE: {
      return <Expense command={command as Commands.Expense} />
    }
    case Commands.CommandType.INCOME: {
      const details = command as Commands.Income

      return (
        <ListItem>
          <ListItemText
            primary={details.raw}
            secondary={`Income $${details.data.amount} to '${details.data.accountName}' recorded`}
          />
        </ListItem>
      )
    }
    case Commands.CommandType.STATUS: {
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
