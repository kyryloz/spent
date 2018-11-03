import { Reducer } from 'redux'
import { Accounts } from './interface'

const initialState: Accounts.State = {
  accounts: [],
}

export const accounts: Reducer<Accounts.State, Accounts.Action> = (
  state = initialState,
  action
): Accounts.State => {
  switch (action.type) {
    case Accounts.ActionTypes.ACCOUNT_ADD: {
      const payload = (<Accounts.Actions.Add>action).payload

      if (state.accounts.find(entry => entry.name === payload.name)) {
        return state
      } else {
        return {
          ...state,
          accounts: [...state.accounts, payload],
        }
      }
    }
    case Accounts.ActionTypes.ACCOUNT_REMOVE: {
      const payload = (<Accounts.Actions.Remove>action).payload

      return {
        ...state,
        accounts: state.accounts.filter(entry => entry.name !== payload),
      }
    }
    case Accounts.ActionTypes.ACCOUNT_BALANCE_CHANGE: {
      const payload = (<Accounts.Actions.BalanceChange>action).payload

      return {
        ...state,
        accounts: state.accounts.map(acc => {
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
