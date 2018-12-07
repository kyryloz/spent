import { CommandWrapper } from 'components/widgets/CommandWrapper'
import { CreateAccount } from 'components/widgets/CreateAccount'
import { CreateCategory } from 'components/widgets/CreateCategory'
import { Expense } from 'components/widgets/Expense'
import { Income } from 'components/widgets/Income'
import { StatusAccounts } from 'components/widgets/StatusAccounts'
import { StatusCategories } from 'components/widgets/StatusCategories'
import * as React from 'react'
import { CommandModel } from 'store/model/command/interface'
import { CommandSelector } from 'store/model/command/selectors'
import { DeleteAccount } from './DeleteAccount'
import { DeleteCategory } from './DeleteCategory'
import { RenameAccount } from './RenameAccount'
import { RenameCategory } from './RenameCategory'
import { UpdateIncome } from './UpdateIncome'

interface ActionClickHandlers {
  onEditClick: () => void
  onDeleteClick: () => void
}

export const createWidget = (
  command: CommandSelector.CommandItem,
  actionClickHandlers: ActionClickHandlers
) => {
  let widgetComponent

  switch (command.data.dataType) {
    case CommandModel.DataType.CREATE_ACCOUNT: {
      widgetComponent = <CreateAccount command={command as CommandModel.CreateAccountData} />
      break
    }
    case CommandModel.DataType.CREATE_CATEGORY: {
      widgetComponent = <CreateCategory command={command as CommandModel.CreateCategoryData} />
      break
    }
    case CommandModel.DataType.EXPENSE: {
      widgetComponent = (
        <Expense
          onEditClick={actionClickHandlers.onEditClick}
          onDeleteClick={actionClickHandlers.onDeleteClick}
          command={command as CommandSelector.ExpenseHydratedData}
        />
      )
      break
    }
    case CommandModel.DataType.INCOME: {
      widgetComponent = (
        <Income
          onEditClick={actionClickHandlers.onEditClick}
          onDeleteClick={actionClickHandlers.onDeleteClick}
          command={command as CommandSelector.IncomeHydratedData}
        />
      )
      break
    }
    case CommandModel.DataType.STATUS: {
      const statusCommand = command as CommandModel.StatusData

      switch (statusCommand.data.entity) {
        case CommandModel.Entity.ACCOUNT:
          widgetComponent = <StatusAccounts command={statusCommand} />
          break

        case CommandModel.Entity.CATEGORY:
          widgetComponent = <StatusCategories command={statusCommand} />
          break
      }
      break
    }
    case CommandModel.DataType.DELETE_ENTITY: {
      const deleteCommand = command as CommandModel.DeleteEntityData

      switch (deleteCommand.data.entity) {
        case CommandModel.Entity.ACCOUNT:
          widgetComponent = <DeleteAccount command={deleteCommand} />
          break

        case CommandModel.Entity.CATEGORY:
          widgetComponent = <DeleteCategory command={deleteCommand} />
          break
      }
      break
    }
    case CommandModel.DataType.RENAME_ENTITY: {
      const renameCommand = command as CommandModel.RenameEntityData

      switch (renameCommand.data.entity) {
        case CommandModel.Entity.ACCOUNT:
          widgetComponent = <RenameAccount command={renameCommand} />
          break

        case CommandModel.Entity.CATEGORY:
          widgetComponent = <RenameCategory command={renameCommand} />
          break
      }
      break
    }
    case CommandModel.DataType.UPDATE_INCOME: {
      widgetComponent = <UpdateIncome command={command as CommandModel.UpdateIncomeData} />
      break
    }
    default:
      throw new Error(`Unknown command type ${JSON.stringify(command.data)}`)
  }

  return (
    <CommandWrapper rawCommand={command.raw} timestamp={command.timestamp}>
      {widgetComponent}
    </CommandWrapper>
  )
}
