import { Reducer } from 'redux'
import { uuidv4 } from '../../utils/math'
import { Commands } from '../commands/interface'
import { Categories } from './interface'
import { App } from '../interface'

const initialState: Categories.State = {
  items: [],
}

export const categories: Reducer<Categories.State, App.Action> = (
  state = initialState,
  action
): Categories.State => {
  switch (action.type) {
    case Commands.ActionTypes.COMMAND_ADD_CREATE_CATEGORY: {
      const actionAdd = action as Commands.Actions.AddCreateCategoryCommand
      if (state.items.find(entry => entry.name === actionAdd.payload.data.name)) {
        return state
      } else {
        return {
          ...state,
          items: [
            ...state.items,
            {
              name: actionAdd.payload.data.name,
              id: uuidv4(),
              commandIds: [actionAdd.payload.id],
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
