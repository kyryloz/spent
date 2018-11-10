import * as React from 'react'
import { Commands } from '../../../store/commands/interface'
import { CreateAccount } from './CreateAccount'
import { CreateCategory } from './CreateCategory'
import { Expense } from './Expense'
import { Income } from './Income'
import { StatusAccounts } from './StatusAccounts'
import { StatusCategories } from './StatusCategories'

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
      const statusCommand = command as Commands.StatusData

      switch (statusCommand.data.entity) {
        case Commands.Entity.ACCOUNT:
          return <StatusAccounts command={statusCommand} />
        case Commands.Entity.CATEGORY:
          return <StatusCategories command={statusCommand} />
      }
    }
    default:
      throw new Error(`Unknown command type ${command.data.dataType}`)
  }
}
