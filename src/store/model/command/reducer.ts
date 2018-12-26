import { Reducer } from 'redux'
import { EvaluationActionCreator, EvaluationActionType } from 'store/evaluation/actions'
import { App } from 'store/interface'
import { CommandActionCreator, CommandActionType } from 'store/model/command/actions'
import { CommandModel } from 'store/model/command/interface'

const initialState: CommandModel.State = {
  items: [],
  error: {
    human: '',
  },
}

export const commands: Reducer<CommandModel.State, App.Action> = (
  state = initialState,
  action
): CommandModel.State => {
  switch (action.type) {
    case EvaluationActionType.CREATE_ACCOUNT:
    case EvaluationActionType.CREATE_CATEGORY:
    case EvaluationActionType.EXPENSE:
    case EvaluationActionType.INCOME:
    case EvaluationActionType.RENAME_ENTITY:
    case EvaluationActionType.TRANSFER:
    case EvaluationActionType.STATUS: {
      return {
        ...state,
        items: [...state.items, action.payload],
        error: {
          human: '',
        },
      }
    }
    case EvaluationActionType.UPDATE_INCOME: {
      const { payload } = action as ReturnType<typeof EvaluationActionCreator.updateIncome>

      const updatedItems = state.items.map(item => {
        if (item.id === payload.data.targetCommandId) {
          const incomeItem = item as CommandModel.IncomeData

          return {
            ...incomeItem,
            data: {
              ...incomeItem.data,
              accountId: payload.data.accountChangeData
                ? payload.data.accountChangeData.newAccountId
                : incomeItem.data.accountId,
              amount: payload.data.amountChangeData
                ? payload.data.amountChangeData.newAmount
                : incomeItem.data.amount,
            },
          }
        } else {
          return item
        }
      })

      return {
        ...state,
        items: [...updatedItems, action.payload],
        error: {
          human: '',
        },
      }
    }
    case EvaluationActionType.UPDATE_EXPENSE: {
      const { payload } = action as ReturnType<typeof EvaluationActionCreator.updateExpense>

      const updatedItems = state.items.map(item => {
        if (item.id === payload.data.targetCommandId) {
          const expenseItem = item as CommandModel.ExpenseData

          return {
            ...expenseItem,
            data: {
              ...expenseItem.data,
              accountId: payload.data.accountChangeData
                ? payload.data.accountChangeData.newAccountId
                : expenseItem.data.accountId,
              categoryId: payload.data.categoryChangeData
                ? payload.data.categoryChangeData.newCategoryId
                : expenseItem.data.categoryId,
              amount: payload.data.amountChangeData
                ? payload.data.amountChangeData.newAmount
                : expenseItem.data.amount,
            },
          }
        } else {
          return item
        }
      })

      return {
        ...state,
        items: [...updatedItems, action.payload],
        error: {
          human: '',
        },
      }
    }
    case EvaluationActionType.UPDATE_TRANSFER: {
      const { payload } = action as ReturnType<typeof EvaluationActionCreator.updateTransfer>

      const updatedItems = state.items.map(item => {
        if (item.id === payload.data.targetCommandId) {
          const expenseItem = item as CommandModel.TransferData

          return {
            ...expenseItem,
            data: {
              ...expenseItem.data,
              accountFromId: payload.data.accountFromChangeData
                ? payload.data.accountFromChangeData.newAccountId
                : expenseItem.data.accountFromId,
              accountToId: payload.data.accountToChangeData
                ? payload.data.accountToChangeData.newAccountId
                : expenseItem.data.accountToId,
              amount: payload.data.amountChangeData
                ? payload.data.amountChangeData.newAmount
                : expenseItem.data.amount,
            },
          }
        } else {
          return item
        }
      })

      return {
        ...state,
        items: [...updatedItems, action.payload],
        error: {
          human: '',
        },
      }
    }
    case EvaluationActionType.DELETE_CATEGORY: {
      const {
        payload: {
          data: {
            category: { commandIds },
          },
        },
      } = action as ReturnType<typeof EvaluationActionCreator.deleteCategory>

      return {
        ...state,
        items: [...state.items.filter(item => commandIds.indexOf(item.id) < 0), action.payload],
        error: {
          human: '',
        },
      }
    }
    case EvaluationActionType.DELETE_ACCOUNT: {
      const {
        payload: {
          data: {
            account: { commandIds },
          },
        },
      } = action as ReturnType<typeof EvaluationActionCreator.deleteAccount>

      return {
        ...state,
        items: [...state.items.filter(item => commandIds.indexOf(item.id) < 0), action.payload],
        error: {
          human: '',
        },
      }
    }
    case EvaluationActionType.DELETE_TRANSACTION: {
      const {
        payload: {
          data: { commandId },
        },
      } = action as ReturnType<typeof EvaluationActionCreator.deleteTransaction>

      return {
        ...state,
        items: [...state.items.filter(item => item.id !== commandId), action.payload],
        error: {
          human: '',
        },
      }
    }
    case CommandActionType.ERROR: {
      const { payload } = action as ReturnType<typeof CommandActionCreator.error>

      return {
        ...state,
        error: payload,
      }
    }
    default: {
      return state
    }
  }
}
