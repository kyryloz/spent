import { Reducer } from 'redux'
import { EvaluationActionType } from 'store/evaluation/actions'
import { App } from 'store/interface'
import { CommandActionType } from 'store/model/command/actions'
import { SmartInputModel } from 'store/model/ui/smartInput/interface'
import { SmartInputActionCreator, SmartInputActionType } from './actions'

const initialState: SmartInputModel.State = {
  input: '',
  focus: true,
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
    case CommandActionType.COMMAND_REMOVE:
    case EvaluationActionType.CREATE_ACCOUNT:
    case EvaluationActionType.CREATE_CATEGORY:
    case EvaluationActionType.EXPENSE:
    case EvaluationActionType.INCOME:
    case EvaluationActionType.DELETE_ENTITY:
    case EvaluationActionType.RENAME_ENTITY:
    case EvaluationActionType.STATUS: {
      return {
        input: '',
        focus: false,
      }
    }
    default: {
      return state
    }
  }
}
