import { CommandWrapper } from 'components/widgets/CommandWrapper'
import { CreateAccount } from 'components/widgets/CreateAccount'
import { CreateCategory } from 'components/widgets/CreateCategory'
import { Expense } from 'components/widgets/Expense'
import { Income } from 'components/widgets/Income'
import { StatusAccounts } from 'components/widgets/StatusAccounts'
import { StatusCategories } from 'components/widgets/StatusCategories'
import * as React from 'react'
import { AccountActionCreator, AccountActionType } from 'store/model/account/actions'
import { CommandModel } from 'store/model/command/interface'
import { CommandSelector } from 'store/model/command/selectors'
import { DeleteAccount } from './DeleteAccount'
import { DeleteCategory } from './DeleteCategory'
import { DeleteTransaction } from './DeleteTransaction'
import { RenameAccount } from './RenameAccount'
import { RenameCategory } from './RenameCategory'
import { Transfer } from './Transfer'
import { UpdateExpense } from './UpdateExpense'
import { UpdateIncome } from './UpdateIncome'
import { CategoryActionType, CategoryActionCreator } from 'store/model/category/actions';
import { TransactionActionType } from 'store/model/transactions/actions';
import { CommandActionType } from 'store/model/command/actions';
import { EvaluationActionType } from 'store/evaluation/actions';

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
      widgetComponent = <CreateCategory command={command.action as ReturnType<typeof CategoryActionCreator.create>} />
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
      // const statusCommand = command as CommandModel.CliCommand

      // switch (statusCommand.action.payload) {
      //   case CommandModel.Entity.ACCOUNT:
      //     widgetComponent = <StatusAccounts command={statusCommand} />
      //     break

      //   case CommandModel.Entity.CATEGORY:
      //     widgetComponent = <StatusCategories command={statusCommand} />
      //     break
      // }
      break
    }
    case AccountActionType.REMOVE: {
      // widgetComponent = <DeleteAccount command={command as CommandModel.DeleteAccountData} />
      break
    }
    case CategoryActionType.REMOVE: {
      // widgetComponent = <DeleteCategory command={command as CommandModel.DeleteCategoryData} />
      break
    }
    case TransactionActionType.REMOVE: {
      // widgetComponent = (
      //   <DeleteTransaction command={command as CommandModel.DeleteTransactionData} />
      // )
      break
    }
    case AccountActionType.UPDATE: {
      // const renameCommand = command as CommandModel.RenameEntityData

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
