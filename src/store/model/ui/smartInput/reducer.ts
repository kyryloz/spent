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
    case EvaluationActionTypes.EVALUATION_CREATE_ACCOUNT:
    case EvaluationActionTypes.EVALUATION_CREATE_CATEGORY:
    case EvaluationActionTypes.EVALUATION_EXPENSE:
    case EvaluationActionTypes.EVALUATION_INCOME:
    case EvaluationActionTypes.EVALUATION_DELETE_ENTITY:
    case EvaluationActionTypes.EVALUATION_RENAME_ENTITY:
    case EvaluationActionTypes.EVALUATION_STATUS: {
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
