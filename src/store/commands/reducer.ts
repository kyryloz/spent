import { Reducer } from 'redux'
import { Commands } from './interface'

const testCommand = {
  id: 'id',
  raw: 'expense 200 on clothes from wallet',
  timestamp: 123123123,
  commandType: Commands.CommandType.EXPENSE,
  data: {
    categoryName: 'clothes',
    amount: 200,
    accountName: 'wallet',
  },
}

const initialState: Commands.State = {
  items: [testCommand],
}

export const commands: Reducer<Commands.State, Commands.Action> = (
  state = initialState,
  action
): Commands.State => {
  switch (action.type) {
    case Commands.ActionTypes.COMMAND_ADD: {
      const payload = (<Commands.Actions.Add>action).payload

      return {
        ...state,
        items: [...state.items, payload],
      }
    }
    case Commands.ActionTypes.COMMAND_REMOVE: {
      const payload = (<Commands.Actions.Remove>action).payload

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
