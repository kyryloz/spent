import { fromPairs, values } from 'lodash'
import { Reducer } from 'redux'
import { CommandsActionCreator } from 'store/commands/actions'
import { removeItem } from '../../utils/storeUtils'
import { Commands } from '../commands/interface'
import { App } from '../interface'
import { Categories } from './interface'

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
      } = action as ReturnType<typeof CommandsActionCreator.addCreateCategoryCommand>

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
      } = action as ReturnType<typeof CommandsActionCreator.expense>

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
    case Commands.ActionTypes.COMMAND_DELETE_ENTITY: {
      const {
        payload: {
          data: { entityId },
        },
      } = action as ReturnType<typeof CommandsActionCreator.addDeleteEntityCommand>

      const allIds = removeItem(state.allIds, entityId)
      const { [entityId]: _, ...byId } = state.byId

      return {
        byId,
        allIds,
      }
    }
    case Commands.ActionTypes.COMMAND_RENAME_ENTITY: {
      const {
        payload: {
          data: { entityId, entity, entityNewName },
        },
      } = action as ReturnType<typeof CommandsActionCreator.addRenameEntityCommand>

      if (entity === Commands.Entity.CATEGORY) {
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
    case Commands.ActionTypes.COMMAND_REMOVE: {
      const {
        payload: { id },
      } = action as ReturnType<typeof CommandsActionCreator.removeCommand>

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
