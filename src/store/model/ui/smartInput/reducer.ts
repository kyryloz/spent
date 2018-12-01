import { Reducer } from 'redux'
import { EvaluationActionTypes } from 'store/evaluation/actions'
import { App } from 'store/interface'
import { SmartInput } from 'store/model/ui/smartInput/interface'
import { SmartInputActionCreator, SmartInputActionTypes } from './actions'

const initialState: SmartInput.State = {
  input: '',
  focus: true,
}

export const smartInput: Reducer<SmartInput.State, App.Action> = (
  state = initialState,
  action
): SmartInput.State => {
  switch (action.type) {
    case SmartInputActionTypes.SET_INPUT: {
      const {
        payload: { input },
      } = action as ReturnType<typeof SmartInputActionCreator.setInput>

      return {
        ...state,
        input,
      }
    }
    case SmartInputActionTypes.SET_FOCUS: {
      const {
        payload: { focus },
      } = action as ReturnType<typeof SmartInputActionCreator.setFocus>

      return {
        ...state,
        focus,
      }
    }
    case EvaluationActionTypes.CREATE_ACCOUNT:
    case EvaluationActionTypes.CREATE_CATEGORY:
    case EvaluationActionTypes.EXPENSE:
    case EvaluationActionTypes.INCOME:
    case EvaluationActionTypes.DELETE_ENTITY:
    case EvaluationActionTypes.RENAME_ENTITY:
    case EvaluationActionTypes.STATUS: {
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
