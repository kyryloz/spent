import { CommandWrapper } from 'components/widgets/CommandWrapper'
import { CreateAccount } from 'components/widgets/CreateAccount'
import { CreateCategory } from 'components/widgets/CreateCategory'
import { Expense } from 'components/widgets/Expense'
import { Income } from 'components/widgets/Income'
import { StatusAccounts } from 'components/widgets/StatusAccounts'
import { StatusCategories } from 'components/widgets/StatusCategories'
import * as React from 'react'
import { Commands } from 'store/commands/interface'

export const createWidget = (command: Commands.CommandData) => {
  let widgetComponent

  switch (command.data.dataType) {
    case Commands.DataType.CREATE_ACCOUNT: {
      widgetComponent = <CreateAccount command={command as Commands.CreateAccountData} />
      break
    }
    case Commands.DataType.CREATE_CATEGORY: {
      widgetComponent = <CreateCategory command={command as Commands.CreateCategoryData} />
      break
    }
    case Commands.DataType.EXPENSE: {
      widgetComponent = <Expense command={command as Commands.ExpenseData} />
      break
    }
    case Commands.DataType.INCOME: {
      widgetComponent = <Income command={command as Commands.IncomeData} />
      break
    }
    case Commands.DataType.STATUS: {
      const statusCommand = command as Commands.StatusData

      switch (statusCommand.data.entity) {
        case Commands.Entity.ACCOUNT:
          widgetComponent = <StatusAccounts command={statusCommand} />
          break

        case Commands.Entity.CATEGORY:
          widgetComponent = <StatusCategories command={statusCommand} />
          break
      }
      break
    }
    default:
      throw new Error(`Unknown command type ${command.data.dataType}`)
  }

  return (
    <CommandWrapper rawCommand={command.raw} timestamp={command.timestamp}>
      {widgetComponent}
    </CommandWrapper>
  )
}
