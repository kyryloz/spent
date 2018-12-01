import { fromPairs, values } from 'lodash'
import { Reducer } from 'redux'
import { EvaluationActionCreators, EvaluationActionTypes } from 'store/evaluation/actions'
import { App } from 'store/interface'
import { CommandsActionCreator, CommandsActionTypes } from 'store/model/command/actions'
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
    case EvaluationActionTypes.CREATE_ACCOUNT: {
      const {
        payload: {
          id: commandId,
          timestamp,
          data: { id, name },
        },
      } = action as ReturnType<typeof EvaluationActionCreators.createAccount>

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
    case EvaluationActionTypes.INCOME:
    case EvaluationActionTypes.EXPENSE: {
      const {
        payload: {
          id,
          data: { accountId },
        },
      } = action as
        | ReturnType<typeof EvaluationActionCreators.expense>
        | ReturnType<typeof EvaluationActionCreators.income>

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
    case EvaluationActionTypes.DELETE_ENTITY: {
      const {
        payload: {
          data: { entityId },
        },
      } = action as ReturnType<typeof EvaluationActionCreators.deleteEntity>

      const allIds = removeItem(state.allIds, entityId)
      const { [entityId]: _, ...byId } = state.byId

      return {
        byId,
        allIds,
      }
    }
    case EvaluationActionTypes.RENAME_ENTITY: {
      const {
        payload: {
          data: { entityId, entity, entityNewName },
        },
      } = action as ReturnType<typeof EvaluationActionCreators.renameEntity>

      if (entity === CommandModel.Entity.ACCOUNT) {
        return {
          ...state,
          byId: {
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
    case CommandsActionTypes.COMMAND_REMOVE: {
      const {
        payload: { id },
      } = action as ReturnType<typeof CommandsActionCreator.removeCommand>

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
