import { fromPairs, values } from 'lodash'
import { Reducer } from 'redux'
import { EvaluationActionCreator, EvaluationActionType } from 'store/evaluation/actions'
import { App } from 'store/interface'
import { CommandActionCreator, CommandActionType } from 'store/model/command/actions'
import { CommandModel } from 'store/model/command/interface'
import { removeItem } from 'utils/storeUtils'
import { AccountModel } from './interface'

const initialState: AccountModel.State = {
  byId: {},
  allIds: [],
}

export const accounts: Reducer<AccountModel.State, App.Action> = (
  state = initialState,
  action
): AccountModel.State => {
  switch (action.type) {
    case EvaluationActionType.CREATE_ACCOUNT: {
      const {
        payload: {
          id: commandId,
          timestamp,
          data: { id, name },
        },
      } = action as ReturnType<typeof EvaluationActionCreator.createAccount>

      const account = Object.keys(state.byId)
        .map(key => state.byId[key])
        .find(value => value.name === name)

      if (account) {
        return state
      } else {
        return {
          ...state,
          byId: {
            ...state.byId,
            [id]: {
              id,
              name,
              createdAt: timestamp,
              createdByCommandId: commandId,
              commandIds: [],
            },
          },
          allIds: [...state.allIds, id],
        }
      }
    }
    case EvaluationActionType.INCOME:
    case EvaluationActionType.EXPENSE: {
      const {
        payload: {
          id,
          data: { accountId },
        },
      } = action as
        | ReturnType<typeof EvaluationActionCreator.expense>
        | ReturnType<typeof EvaluationActionCreator.income>

      return {
        ...state,
        byId: {
          ...state.byId,
          [accountId]: {
            ...state.byId[accountId],
            commandIds: [...state.byId[accountId].commandIds, id],
          },
        },
      }
    }
    case EvaluationActionType.TRANSFER: {
      const {
        payload: {
          id,
          data: { accountFromId, accountToId },
        },
      } = action as ReturnType<typeof EvaluationActionCreator.transfer>

      return {
        ...state,
        byId: {
          ...state.byId,
          [accountFromId]: {
            ...state.byId[accountFromId],
            commandIds: [...state.byId[accountFromId].commandIds, id],
          },
          [accountToId]: {
            ...state.byId[accountToId],
            commandIds: [...state.byId[accountToId].commandIds, id],
          },
        },
      }
    }
    case EvaluationActionType.UPDATE_TRANSFER: {
      const {
        payload: {
          data: { targetCommandId, accountFromChangeData, accountToChangeData },
        },
      } = action as ReturnType<typeof EvaluationActionCreator.updateTransfer>

      let newState = state
      if (accountFromChangeData) {
        newState = {
          ...state,
          byId: {
            ...state.byId,
            [accountFromChangeData.oldAccountId]: {
              ...state.byId[accountFromChangeData.oldAccountId],
              commandIds: removeItem(
                state.byId[accountFromChangeData.oldAccountId].commandIds,
                targetCommandId
              ),
            },
            [accountFromChangeData.newAccountId]: {
              ...state.byId[accountFromChangeData.newAccountId],
              commandIds: [
                ...state.byId[accountFromChangeData.newAccountId].commandIds,
                targetCommandId,
              ],
            },
          },
        }
      }

      if (accountToChangeData) {
        newState = {
          ...newState,
          byId: {
            ...state.byId,
            [accountToChangeData.oldAccountId]: {
              ...state.byId[accountToChangeData.oldAccountId],
              commandIds: removeItem(
                state.byId[accountToChangeData.oldAccountId].commandIds,
                targetCommandId
              ),
            },
            [accountToChangeData.newAccountId]: {
              ...state.byId[accountToChangeData.newAccountId],
              commandIds: [
                ...state.byId[accountToChangeData.newAccountId].commandIds,
                targetCommandId,
              ],
            },
          },
        }
      }

      return newState
    }

    case EvaluationActionType.UPDATE_INCOME:
    case EvaluationActionType.UPDATE_EXPENSE: {
      const {
        payload: {
          data: { targetCommandId, accountChangeData },
        },
      } = action as
        | ReturnType<typeof EvaluationActionCreator.updateExpense>
        | ReturnType<typeof EvaluationActionCreator.updateIncome>

      if (accountChangeData) {
        return {
          ...state,
          byId: {
            ...state.byId,
            [accountChangeData.oldAccountId]: {
              ...state.byId[accountChangeData.oldAccountId],
              commandIds: removeItem(
                state.byId[accountChangeData.oldAccountId].commandIds,
                targetCommandId
              ),
            },
            [accountChangeData.newAccountId]: {
              ...state.byId[accountChangeData.newAccountId],
              commandIds: [
                ...state.byId[accountChangeData.newAccountId].commandIds,
                targetCommandId,
              ],
            },
          },
        }
      }

      return state
    }
    case EvaluationActionType.DELETE_ACCOUNT: {
      const {
        payload: {
          data: { account },
        },
      } = action as ReturnType<typeof EvaluationActionCreator.deleteAccount>

      const allIds = removeItem(state.allIds, account.id)
      const { [account.id]: _, ...byId } = state.byId

      return {
        byId,
        allIds,
      }
    }
    case EvaluationActionType.RENAME_ENTITY: {
      const {
        payload: {
          data: { entityId, entity, entityNewName },
        },
      } = action as ReturnType<typeof EvaluationActionCreator.renameEntity>

      if (entity === CommandModel.Entity.ACCOUNT) {
        return {
          ...state,
          byId: {
            ...state.byId,
            [entityId]: {
              ...state.byId[entityId],
              name: entityNewName,
            },
          },
        }
      } else {
        return state
      }
    }
    case EvaluationActionType.DELETE_TRANSACTION: {
      const {
        payload: { id },
      } = action as ReturnType<typeof EvaluationActionCreator.deleteEntity>

      const accounts = values(state.byId)
        .map(account => ({
          ...account,
          commandIds: account.commandIds.filter(commandId => commandId !== id),
        }))
        .filter(account => account.createdByCommandId !== id)

      return {
        byId: fromPairs(accounts.map(account => [account.id, account])),
        allIds: accounts.map(account => account.id),
      }
    }
    default: {
      return state
    }
  }
}
