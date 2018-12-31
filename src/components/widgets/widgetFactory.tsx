import { CommandWrapper } from 'components/widgets/CommandWrapper'
import { CreateAccount } from 'components/widgets/CreateAccount'
import { CreateCategory } from 'components/widgets/CreateCategory'
import { Expense } from 'components/widgets/Expense'
import { Income } from 'components/widgets/Income'
import * as React from 'react'
import { EvaluationActionCreator, EvaluationActionType } from 'store/evaluation/actions'
import { AccountActionCreator, AccountActionType } from 'store/model/account/actions'
import { CategoryActionCreator, CategoryActionType } from 'store/model/category/actions'
import { CommandModel } from 'store/model/cli/interface'
import { CommandSelector } from 'store/model/cli/selectors'
import { TransactionActionCreator, TransactionActionType } from 'store/model/transactions/actions'
import { DeleteAccount } from './DeleteAccount'
import { DeleteCategory } from './DeleteCategory'
import { DeleteTransaction } from './DeleteTransaction'
import { RenameAccount } from './RenameAccount'
import { RenameCategory } from './RenameCategory'
import { StatusAccounts } from './StatusAccounts'
import { StatusCategories } from './StatusCategories'
import { Transfer } from './Transfer'
import { UpdateExpense } from './UpdateExpense'
import { UpdateIncome } from './UpdateIncome'
import { UpdateTransfer } from './UpdateTransfer'

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

      switch (statusCommand.payload.entity) {
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
    case CategoryActionType.UPDATE: {
      widgetComponent = (
        <RenameCategory
          command={command.action as ReturnType<typeof CategoryActionCreator.update>}
        />
      )
      break
    }
    case AccountActionType.UPDATE: {
      widgetComponent = (
        <RenameAccount command={command.action as ReturnType<typeof AccountActionCreator.update>} />
      )
      break
    }
    case TransactionActionType.UPDATE_INCOME: {
      widgetComponent = (
        <UpdateIncome
          command={command.action as ReturnType<typeof TransactionActionCreator.updateIncome>}
        />
      )
      break
    }
    case TransactionActionType.UPDATE_EXPENSE: {
      widgetComponent = (
        <UpdateExpense
          command={command.action as ReturnType<typeof TransactionActionCreator.updateExpense>}
        />
      )
      break
    }
    case TransactionActionType.UPDATE_TRANSFER: {
      widgetComponent = (
        <UpdateTransfer
          command={command.action as ReturnType<typeof TransactionActionCreator.updateTransfer>}
        />
      )
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
