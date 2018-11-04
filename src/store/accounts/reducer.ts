import { Reducer } from 'redux'
import { Accounts } from './interface'

const initialState: Accounts.State = {
  items: [],
}

export const accounts: Reducer<Accounts.State, Accounts.Action> = (
  state = initialState,
  action
): Accounts.State => {
  switch (action.type) {
    case Accounts.ActionTypes.ACCOUNT_ADD: {
      const payload = (<Accounts.Actions.Add>action).payload

      if (state.items.find(entry => entry.name === payload.name)) {
        return state
      } else {
        return {
          ...state,
          items: [...state.items, payload],
        }
      }
    }
    case Accounts.ActionTypes.ACCOUNT_REMOVE: {
      const payload = (<Accounts.Actions.Remove>action).payload

      return {
        ...state,
        items: state.items.filter(entry => entry.id !== payload.id),
      }
    }
    default: {
      return state
    }
  }
}
