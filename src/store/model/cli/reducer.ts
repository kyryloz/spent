import { Reducer } from 'redux'
import { App } from 'store/interface'
import { CommandActionCreator, CommandActionType } from 'store/model/cli/actions'
import { CommandModel } from 'store/model/cli/interface'

const initialState: CommandModel.State = {
  cliActions: [],
  error: {
    human: '',
  },
}

export const commands: Reducer<CommandModel.State, App.Action> = (
  state = initialState,
  action
): CommandModel.State => {
  switch (action.type) {
    case CommandActionType.ADD: {
      const { payload } = action as ReturnType<typeof CommandActionCreator.addCommand>

      return {
        ...state,
        cliActions: [...state.cliActions, payload],
        error: {
          human: '',
        },
      }
    }
    case CommandActionType.REMOVE: {
      const {
        payload: { commandId },
      } = action as ReturnType<typeof CommandActionCreator.removeCommand>

      return {
        ...state,
        cliActions: state.cliActions.filter(item => item.id !== commandId),
        error: {
          human: '',
        },
      }
    }
    case CommandActionType.ERROR: {
      const { payload } = action as ReturnType<typeof CommandActionCreator.error>

      return {
        ...state,
        error: payload,
      }
    }
    default: {
      return state
    }
  }
}
