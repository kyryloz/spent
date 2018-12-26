import { fromPairs, values } from 'lodash'
import { Reducer } from 'redux'
import { EvaluationActionCreator, EvaluationActionType } from 'store/evaluation/actions'
import { App } from 'store/interface'
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
    case EvaluationActionType.UPDATE_EXPENSE: {
      const {
        payload: {
          data: { targetCommandId, categoryChangeData },
        },
      } = action as ReturnType<typeof EvaluationActionCreator.updateExpense>

      if (categoryChangeData) {
        return {
          ...state,
          byId: {
            ...state.byId,
            [categoryChangeData.oldCategoryId]: {
              ...state.byId[categoryChangeData.oldCategoryId],
              commandIds: removeItem(
                state.byId[categoryChangeData.oldCategoryId].commandIds,
                targetCommandId
              ),
            },
            [categoryChangeData.newCategoryId]: {
              ...state.byId[categoryChangeData.newCategoryId],
              commandIds: [
                ...state.byId[categoryChangeData.newCategoryId].commandIds,
                targetCommandId,
              ],
            },
          },
        }
      }

      return state
    }
    case EvaluationActionType.DELETE_CATEGORY: {
      const {
        payload: {
          data: { category },
        },
      } = action as ReturnType<typeof EvaluationActionCreator.deleteCategory>

      const allIds = removeItem(state.allIds, category.id)
      const { [category.id]: _, ...byId } = state.byId

      return {
        byId,
        allIds,
      }
    }
    case EvaluationActionType.DELETE_ACCOUNT: {
      const {
        payload: {
          data: {
            account: { commandIds },
          },
        },
      } = action as ReturnType<typeof EvaluationActionCreator.deleteAccount>

      const categories = values(state.byId).map(category => ({
        ...category,
        commandIds: category.commandIds.filter(id => commandIds.indexOf(id) < 0),
      }))

      return {
        byId: fromPairs(categories.map(category => [category.id, category])),
        allIds: categories.map(category => category.id),
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
            ...state.byId,
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
    case EvaluationActionType.DELETE_TRANSACTION: {
      const {
        payload: {
          data: { commandId },
        },
      } = action as ReturnType<typeof EvaluationActionCreator.deleteTransaction>

      const categories = values(state.byId)
        .map(category => ({
          ...category,
          commandIds: category.commandIds.filter(id => id !== commandId),
        }))
        .filter(category => category.createdByCommandId !== commandId)

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
