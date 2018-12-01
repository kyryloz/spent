import { fromPairs, values } from 'lodash'
import { Reducer } from 'redux'
import { EvaluationActionCreator, EvaluationActionType } from 'store/evaluation/actions'
import { App } from 'store/interface'
import { CommandActionCreator, CommandActionType } from 'store/model/command/actions'
import { CommandModel } from 'store/model/command/interface'
import { removeItem } from 'utils/storeUtils'
import { CategoryModel } from './interface'

const initialState: CategoryModel.State = {
  byId: {},
  allIds: [],
}

export const categories: Reducer<CategoryModel.State, App.Action> = (
  state = initialState,
  action
): CategoryModel.State => {
  switch (action.type) {
    case EvaluationActionType.CREATE_CATEGORY: {
      const {
        payload: {
          id: commandId,
          timestamp,
          data: { id, name },
        },
      } = action as ReturnType<typeof EvaluationActionCreator.createCategory>

      const category = Object.keys(state.byId)
        .map(key => state.byId[key])
        .find(value => value.name === name)

      if (category) {
        return state
      } else {
        return {
          ...state,
          byId: {
            ...state.byId,
            [id]: {
              id,
              name,
              createdAt: timestamp,
              createdByCommandId: commandId,
              commandIds: [],
            },
          },
          allIds: [...state.allIds, id],
        }
      }
    }
    case EvaluationActionType.EXPENSE: {
      const {
        payload: {
          id,
          data: { categoryId },
        },
      } = action as ReturnType<typeof EvaluationActionCreator.expense>

      return {
        ...state,
        byId: {
          ...state.byId,
          [categoryId]: {
            ...state.byId[categoryId],
            commandIds: [...state.byId[categoryId].commandIds, id],
          },
        },
      }
    }
    case EvaluationActionType.DELETE_ENTITY: {
      const {
        payload: {
          data: { entityId },
        },
      } = action as ReturnType<typeof EvaluationActionCreator.deleteEntity>

      const allIds = removeItem(state.allIds, entityId)
      const { [entityId]: _, ...byId } = state.byId

      return {
        byId,
        allIds,
      }
    }
    case EvaluationActionType.RENAME_ENTITY: {
      const {
        payload: {
          data: { entityId, entity, entityNewName },
        },
      } = action as ReturnType<typeof EvaluationActionCreator.renameEntity>

      if (entity === CommandModel.Entity.CATEGORY) {
        return {
          ...state,
          byId: {
            [entityId]: {
              ...state.byId[entityId],
              name: entityNewName,
            },
          },
        }
      } else {
        return state
      }
    }
    case CommandActionType.COMMAND_REMOVE: {
      const {
        payload: { id },
      } = action as ReturnType<typeof CommandActionCreator.removeCommand>

      const categories = values(state.byId)
        .map(category => ({
          ...category,
          commandIds: category.commandIds.filter(commandId => commandId !== id),
        }))
        .filter(category => category.createdByCommandId !== id)

      return {
        byId: fromPairs(categories.map(category => [category.id, category])),
        allIds: categories.map(category => category.id),
      }
    }
    default: {
      return state
    }
  }
}
