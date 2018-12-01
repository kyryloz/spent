import { Reducer } from 'redux'
import { App } from 'store/interface'
import { CommandsActionCreator, CommandsActionTypes } from 'store/model/command/actions'
import { CommandModel } from 'store/model/command/interface'
import { EvaluationActionTypes } from 'store/evaluation/actions';

const initialState: CommandModel.State = {
  items: [],
  error: {
    human: '',
  },
}

export const commands: Reducer<CommandModel.State, App.Action> = (
  state = initialState,
  action
): CommandModel.State => {
  switch (action.type) {
    case EvaluationActionTypes.CREATE_ACCOUNT:
    case EvaluationActionTypes.CREATE_CATEGORY:
    case EvaluationActionTypes.EXPENSE:
    case EvaluationActionTypes.INCOME:
    case EvaluationActionTypes.DELETE_ENTITY:
    case EvaluationActionTypes.RENAME_ENTITY:
    case EvaluationActionTypes.STATUS: {
      return {
        ...state,
        items: [...state.items, action.payload],
        error: {
          human: '',
        },
      }
    }
    case CommandsActionTypes.COMMAND_REMOVE: {
      const {
        payload: { id },
      } = action as ReturnType<typeof CommandsActionCreator.removeCommand>

      return {
        ...state,
        items: state.items.filter(item => item.id !== id),
        error: {
          human: '',
        },
      }
    }
    case CommandsActionTypes.ERROR: {
      const { payload } = action as ReturnType<typeof CommandsActionCreator.error>

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
