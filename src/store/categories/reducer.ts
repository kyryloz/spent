import { Reducer } from 'redux'
import { removeItem } from '../../utils/storeUtils'
import { Commands } from '../commands/interface'
import { App } from '../interface'
import { Categories } from './interface'
import { values, fromPairs } from 'lodash';

const initialState: Categories.State = {
  byId: {},
  allIds: [],
}

export const categories: Reducer<Categories.State, App.Action> = (
  state = initialState,
  action
): Categories.State => {
  switch (action.type) {
    case Commands.ActionTypes.COMMAND_CREATE_CATEGORY: {
      const {
        payload: {
          id: commandId,
          timestamp,
          data: { id, name },
        },
      } = action as Commands.Actions.CreateCategoryCommand

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
    case Commands.ActionTypes.COMMAND_EXPENSE: {
      const {
        payload: {
          id,
          data: { categoryId },
        },
      } = action as Commands.Actions.ExpenseCommand

      return {
        ...state,
        byId: {
          ...state.byId,
          [categoryId]: {
            ...state.byId[categoryId],
            commandIds: [
              ...state.byId[categoryId].commandIds,
              id,
            ]
          }
        }
      }
    }
    case Categories.ActionTypes.CATEGORY_REMOVE: {
      const {
        payload: { id },
      } = action as Categories.Actions.Remove

      const allIds = removeItem(state.allIds, id)
      const { [id]: _, ...byId } = state.byId

      return {
        byId,
        allIds,
      }
    }
    case Commands.ActionTypes.COMMAND_REMOVE: {
      const {
        payload: { id },
      } = action as Commands.Actions.Remove

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
