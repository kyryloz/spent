import { Reducer } from 'redux'
import { Commands } from '../commands/interface'
import { App } from '../interface'
import { Accounts } from './interface'
import { removeItem } from '../../utils/storeUtils'

const initialState: Accounts.State = {
  byId: {},
  allIds: [],
}

export const accounts: Reducer<Accounts.State, App.Action> = (
  state = initialState,
  action
): Accounts.State => {
  switch (action.type) {
    case Commands.ActionTypes.COMMAND_CREATE_ACCOUNT: {
      const {
        payload: {
          timestamp,
          data: { id, name },
        },
      } = action as Commands.Actions.CreateAccountCommand

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
              commandIds: [],
            },
          },
          allIds: [...state.allIds, id],
        }
      }
    }
    case Commands.ActionTypes.COMMAND_INCOME:
    case Commands.ActionTypes.COMMAND_EXPENSE: {
      const {
        payload: {
          id,
          data: { accountId },
        },
      } = action as Commands.Actions.ExpenseCommand | Commands.Actions.IncomeCommand

      return {
        ...state,
        byId: {
          ...state.byId,
          [accountId]: {
            ...state.byId[accountId],
            commandIds: [
              ...state.byId[accountId].commandIds,
              id,
            ]
          }
        }
      }
    }
    case Accounts.ActionTypes.ACCOUNT_REMOVE: {
      const {
        payload: { id },
      } = action as Accounts.Actions.Remove

      const allIds = removeItem(state.allIds, id)
      const { [id]: _, ...byId } = state.byId

      return {
        byId,
        allIds,
      }
    }
    default: {
      return state
    }
  }
}
