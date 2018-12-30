import { CommandWrapper } from 'components/widgets/CommandWrapper'
import { CreateAccount } from 'components/widgets/CreateAccount'
import { CreateCategory } from 'components/widgets/CreateCategory'
import { Expense } from 'components/widgets/Expense'
import { Income } from 'components/widgets/Income'
import * as React from 'react'
import { EvaluationActionType, EvaluationActionCreator } from 'store/evaluation/actions'
import { AccountActionCreator, AccountActionType } from 'store/model/account/actions'
import { CategoryActionCreator, CategoryActionType } from 'store/model/category/actions'
import { CommandSelector } from 'store/model/command/selectors'
import { TransactionActionType, TransactionActionCreator } from 'store/model/transactions/actions'
import { DeleteAccount } from './DeleteAccount'
import { DeleteCategory } from './DeleteCategory'
import { Transfer } from './Transfer'
import { DeleteTransaction } from './DeleteTransaction'
import { CommandModel } from 'store/model/command/interface'
import { StatusAccounts } from './StatusAccounts'
import { StatusCategories } from './StatusCategories'

interface ActionClickHandlers {
  onEditClick: () => void
  onDeleteClick: () => void
}

export const createWidget = (
  command: CommandSelector.CommandItem,
  actionClickHandlers: ActionClickHandlers
) => {
  let widgetComponent

  switch (command.action.type) {
    case AccountActionType.CREATE: {
      widgetComponent = (
        <CreateAccount command={command.action as ReturnType<typeof AccountActionCreator.create>} />
      )
      break
    }
    case CategoryActionType.CREATE: {
      widgetComponent = (
        <CreateCategory
          command={command.action as ReturnType<typeof CategoryActionCreator.create>}
        />
      )
      break
    }
    case TransactionActionType.EXPENSE: {
      widgetComponent = (
        <Expense
          onEditClick={actionClickHandlers.onEditClick}
          onDeleteClick={actionClickHandlers.onDeleteClick}
          command={command as CommandSelector.ExpenseCommand}
        />
      )
      break
    }
    case TransactionActionType.INCOME: {
      widgetComponent = (
        <Income
          onEditClick={actionClickHandlers.onEditClick}
          onDeleteClick={actionClickHandlers.onDeleteClick}
          command={command as CommandSelector.IncomeCommand}
        />
      )
      break
    }
    case EvaluationActionType.STATUS: {
      const statusCommand = command.action as ReturnType<typeof EvaluationActionCreator.status>

      switch (statusCommand.payload.data.entity) {
        case CommandModel.Entity.ACCOUNT:
          widgetComponent = <StatusAccounts command={statusCommand} />
          break

        case CommandModel.Entity.CATEGORY:
          widgetComponent = <StatusCategories command={statusCommand} />
          break
      }
      break
    }
    case AccountActionType.REMOVE: {
      widgetComponent = (
        <DeleteAccount command={command.action as ReturnType<typeof AccountActionCreator.remove>} />
      )
      break
    }
    case CategoryActionType.REMOVE: {
      widgetComponent = (
        <DeleteCategory
          command={command.action as ReturnType<typeof CategoryActionCreator.remove>}
        />
      )
      break
    }
    case TransactionActionType.REMOVE: {
      widgetComponent = (
        <DeleteTransaction
          command={command.action as ReturnType<typeof TransactionActionCreator.remove>}
        />
      )
      break
    }
    case EvaluationActionType.RENAME_ENTITY: {
      // const renameCommand = command as EvAC

      // switch (renameCommand.data.entity) {
      //   case CommandModel.Entity.ACCOUNT:
      //     widgetComponent = <RenameAccount command={renameCommand} />
      //     break

      //   case CommandModel.Entity.CATEGORY:
      //     widgetComponent = <RenameCategory command={renameCommand} />
      //     break
      // }
      break
    }
    case TransactionActionType.UPDATE_INCOME: {
      // widgetComponent = <UpdateIncome command={command as CommandModel.UpdateIncomeData} />
      break
    }
    case TransactionActionType.UPDATE_EXPENSE: {
      // widgetComponent = <UpdateExpense command={command as CommandModel.UpdateExpenseData} />
      break
    }
    case TransactionActionType.UPDATE_TRANSFER: {
      // widgetComponent = <UpdateExpense command={command as CommandModel.UpdateExpenseData} />
      break
    }
    case TransactionActionType.TRANSFER: {
      widgetComponent = (
        <Transfer
          onEditClick={actionClickHandlers.onEditClick}
          onDeleteClick={actionClickHandlers.onDeleteClick}
          command={command as CommandSelector.TransferCommand}
        />
      )
      break
    }
    default:
      throw new Error(`Unknown command ${JSON.stringify(command)}`)
  }

  return (
    <CommandWrapper rawCommand={command.raw} timestamp={command.timestamp}>
      {widgetComponent}
    </CommandWrapper>
  )
}
