import { Reducer } from 'redux'
import { Accounts } from './interface'

const initialState: Accounts.State = {
  list: [],
}

export const accounts: Reducer<Accounts.State, Accounts.Action> = (
  state = initialState,
  action
): Accounts.State => {
  switch (action.type) {
    case Accounts.ActionTypes.ACCOUNT_ADD: {
      const payload = (<Accounts.Actions.Add>action).payload

      if (state.list.find(entry => entry.name === payload.name)) {
        return state
      } else {
        return {
          ...state,
          list: [...state.list, payload],
        }
      }
    }
    case Accounts.ActionTypes.ACCOUNT_REMOVE: {
      const payload = (<Accounts.Actions.Remove>action).payload

      return {
        ...state,
        list: state.list.filter(entry => entry.id !== payload.id),
      }
    }
    case Accounts.ActionTypes.ACCOUNT_BALANCE_CHANGE: {
      const payload = (<Accounts.Actions.BalanceChange>action).payload

      return {
        ...state,
        list: state.list.map(acc => {
          if (acc.name === payload.accountName) {
            return {
              ...acc,
              balance: acc.balance + payload.amount,
            }
          }

          return acc
        }),
      }
    }
    default: {
      return state
    }
  }
}
