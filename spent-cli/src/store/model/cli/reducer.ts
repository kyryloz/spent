import { Reducer } from 'redux'
import { App } from 'store/interface'
import { CliActionCreator, CliActionType } from 'store/model/cli/actions'
import { CliModel } from 'store/model/cli/interface'

const initialState: CliModel.State = {
  cliActions: [],
}

export const cli: Reducer<CliModel.State, App.Action> = (
  state = initialState,
  action
): CliModel.State => {
  switch (action.type) {
    case CliActionType.ADD: {
      const { payload } = action as ReturnType<typeof CliActionCreator.addCommand>

      return {
        ...state,
        cliActions: [...state.cliActions, payload],
      }
    }
    case CliActionType.REMOVE: {
      const {
        payload: { commandId },
      } = action as ReturnType<typeof CliActionCreator.removeCommand>

      return {
        ...state,
        cliActions: state.cliActions.filter(item => item.id !== commandId),
      }
    }
    default: {
      return state
    }
  }
}
