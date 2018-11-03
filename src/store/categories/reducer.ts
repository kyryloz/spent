import { Reducer } from 'redux'
import { Categories } from './interface'

const initialState: Categories.State = {
  categories: [],
}

export const accounts: Reducer<Categories.State, Categories.Action> = (
  state = initialState,
  action
): Categories.State => {
  switch (action.type) {
    case Categories.ActionTypes.CATEGORY_ADD: {
      const payload = (<Categories.Actions.Add>action).payload

      if (state.categories.find(entry => entry.name === payload.name)) {
        return state
      } else {
        return {
          ...state,
          categories: [...state.categories, payload],
        }
      }
    }
    case Categories.ActionTypes.CATEGORY_REMOVE: {
      const payload = (<Categories.Actions.Remove>action).payload

      return {
        ...state,
        categories: state.categories.filter(entry => entry.id !== payload.id),
      }
    }
    default: {
      return state
    }
  }
}
