import { Reducer } from 'redux'
import { Commands } from '../commands/interface'
import { App } from '../interface'
import { Categories } from './interface'

const initialState: Categories.State = {
  items: [],
}

export const categories: Reducer<Categories.State, App.Action> = (
  state = initialState,
  action
): Categories.State => {
  switch (action.type) {
    case Commands.ActionTypes.COMMAND_CREATE_CATEGORY: {
      const actionAdd = action as Commands.Actions.CreateCategoryCommand
      if (state.items.find(entry => entry.name === actionAdd.payload.data.name)) {
        return state
      } else {
        return {
          ...state,
          items: [
            ...state.items,
            {
              id: actionAdd.payload.data.id,
              name: actionAdd.payload.data.name,
              commandIds: [], // TODO
            },
          ],
        }
      }
    }
    case Categories.ActionTypes.CATEGORY_REMOVE: {
      const payload = (<Categories.Actions.Remove>action).payload

      return {
        ...state,
        items: state.items.filter(entry => entry.id !== payload.id),
      }
    }
    default: {
      return state
    }
  }
}
