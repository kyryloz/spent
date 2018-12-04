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
    case EvaluationActionType.DELETE_ENTITY: {
      const {
        payload: {
          data: { entityId },
        },
      } = action as ReturnType<typeof EvaluationActionCreator.deleteEntity>

      const allIds = removeItem(state.allIds, entityId)
      const { [entityId]: _, ...byId } = state.byId

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
    case CommandActionType.COMMAND_REMOVE: {
      const {
        payload: { id },
      } = action as ReturnType<typeof CommandActionCreator.removeCommand>

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
