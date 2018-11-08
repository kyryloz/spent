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
              id: id,
              name: name,
              commandIds: [],
            },
          },
          allIds: [...state.allIds, id],
        }
      }
    }
    case Accounts.ActionTypes.ACCOUNT_REMOVE: {
      const {
        payload: { id },
      } = action as Accounts.Actions.Remove

      const allIds = removeItem(state.allIds, id)
      const { [id]: value, ...byId } = state.byId

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
