import { Reducer } from 'redux'
import { Application } from '../interface'

const initialState: Accounts.State = {
  accounts: [],
}

export const accounts: Reducer<Accounts.State, Application.Action<any, Accounts.ActionTypes>> = (
  state = initialState,
  action
): Accounts.State => {
  switch (action.type) {
    case Accounts.ActionTypes.ACCOUNT_ADD: {
      if (state.accounts.filter(entry => entry.name === action.payload.name)) {
        return state
      } else {
        return {
          ...state,
          accounts: [...state.accounts, action.payload],
        }
      }
    }
    case Accounts.ActionTypes.ACCOUNT_REMOVE: {
      return {
        ...state,
        accounts: state.accounts.filter(entry => entry.name !== action.payload.name),
      }
    }
    case Accounts.ActionTypes.ACCOUNT_BALANCE_CHANGE: {
      return state
    }
    default: {
      return state
    }
  }
}
