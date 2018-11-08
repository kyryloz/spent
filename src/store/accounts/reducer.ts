import { Reducer } from 'redux'
import { Commands } from '../commands/interface'
import { App } from '../interface'
import { Accounts } from './interface'

const initialState: Accounts.State = {
  items: [],
}

export const accounts: Reducer<Accounts.State, App.Action> = (
  state = initialState,
  action
): Accounts.State => {
  switch (action.type) {
    case Commands.ActionTypes.COMMAND_CREATE_ACCOUNT: {
      const actionAdd = action as Commands.Actions.CreateAccountCommand
      if (state.items.find(entry => entry.name === actionAdd.payload.data.name)) {
        return state
      } else {
        return {
          ...state,
          items: [
            ...state.items,
            {
              id: actionAdd.payload.data.id,
              name: actionAdd.payload.data.name,
              commandIds: [], // TODO
            },
          ],
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
