import { Reducer } from 'redux'
import { App } from 'store/interface'
import { CliActionCreator, CliActionType } from 'store/model/cli/actions'
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
    case CliActionType.ADD: {
      const { payload } = action as ReturnType<typeof CliActionCreator.addCommand>

      return {
        ...state,
        cliActions: [...state.cliActions, payload],
        error: {
          human: '',
        },
      }
    }
    case CliActionType.REMOVE: {
      const {
        payload: { commandId },
      } = action as ReturnType<typeof CliActionCreator.removeCommand>

      return {
        ...state,
        cliActions: state.cliActions.filter(item => item.id !== commandId),
        error: {
          human: '',
        },
      }
    }
    case CliActionType.ERROR: {
      const { payload } = action as ReturnType<typeof CliActionCreator.error>

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
