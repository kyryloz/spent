import { Reducer } from 'redux'
import { App } from 'store/interface'
import { CliActionCreator, CliActionType } from 'store/model/cli/actions'
import { SmartInputModel } from 'store/model/ui/cliInput/interface'
import { SmartInputActionCreator, SmartInputActionType } from './actions'

const initialState: SmartInputModel.State = {
  input: '',
  dirty: false,
  focus: true,
  history: [],
  historyPointer: -1,
  error: {
    human: ''
  }
}

export const smartInput: Reducer<SmartInputModel.State, App.Action> = (
  state = initialState,
  action
): SmartInputModel.State => {
  switch (action.type) {
    case SmartInputActionType.SET_INPUT: {
      const {
        payload: { input },
      } = action as ReturnType<typeof SmartInputActionCreator.setInput>

      return {
        ...state,
        input,
        dirty: input.length > 0,
        historyPointer: -1,
      }
    }
    case SmartInputActionType.SET_FOCUS: {
      const {
        payload: { focus },
      } = action as ReturnType<typeof SmartInputActionCreator.setFocus>

      return {
        ...state,
        focus,
      }
    }
    case SmartInputActionType.HISTORY_UP: {
      if (state.dirty) {
        return state
      }

      let historyPointer = state.historyPointer + 1

      if (historyPointer >= state.history.length) {
        historyPointer = state.history.length - 1
      }

      return {
        ...state,
        historyPointer,
        input: state.history[historyPointer],
      }
    }
    case SmartInputActionType.HISTORY_DOWN: {
      if (state.dirty) {
        return state
      }

      let historyPointer = state.historyPointer - 1

      if (historyPointer < -1) {
        historyPointer = -1
      }

      return {
        ...state,
        historyPointer,
        input: historyPointer < 0 ? '' : state.history[historyPointer],
      }
    }
    case SmartInputActionType.ERROR: {
      const { payload } = action as ReturnType<typeof SmartInputActionCreator.error>

      return {
        ...state,
        error: payload,
      }
    }
    case CliActionType.ADD: {
      const { payload } = action as ReturnType<typeof CliActionCreator.addCommand>

      return {
        ...state,
        error: {
          human: ''
        },
        input: '',
        dirty: false,
        focus: false,
        history: [payload.raw, ...state.history],
        historyPointer: -1,
      }
    }
    default: {
      return state
    }
  }
}
