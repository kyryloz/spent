import { Reducer } from 'redux'
import { App } from 'store/interface'
import { AccountActionCreator, AccountActionType } from './actions'
import { AccountModel } from './interface'

const initialState: AccountModel.State = {
  items: {},
}

export const accounts: Reducer<AccountModel.State, App.Action> = (
  state = initialState,
  action
): AccountModel.State => {
  switch (action.type) {
    case AccountActionType.CREATE: {
      const { payload } = action as ReturnType<typeof AccountActionCreator.create>

      return {
        ...state,
        items: {
          ...state.items,
          [payload.id]: payload,
        },
      }
    }
    case AccountActionType.UPDATE: {
      const {
        payload: { id, name },
      } = action as ReturnType<typeof AccountActionCreator.update>

      return {
        ...state,
        items: {
          ...state.items,
          [id]: {
            ...state.items[id],
            name,
          },
        },
      }
    }
    case AccountActionType.REMOVE: {
      const {
        payload: { accountId },
      } = action as ReturnType<typeof AccountActionCreator.remove>

      const { [accountId]: _removed, ...items } = state.items

      return {
        ...state,
        items,
      }
    }
    default: {
      return state
    }
  }
}
