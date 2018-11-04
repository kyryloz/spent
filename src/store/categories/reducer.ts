import { Reducer } from 'redux'
import { Categories } from './interface'

const initialState: Categories.State = {
  items: [],
}

export const categories: Reducer<Categories.State, Categories.Action> = (
  state = initialState,
  action
): Categories.State => {
  switch (action.type) {
    case Categories.ActionTypes.CATEGORY_ADD: {
      const payload = (<Categories.Actions.Add>action).payload

      if (state.items.find(entry => entry.name === payload.name)) {
        return state
      } else {
        return {
          ...state,
          items: [...state.items, payload],
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
