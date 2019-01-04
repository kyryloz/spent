import { Reducer } from 'redux'
import { CoreAction } from '../..'
import { CategoryActionCreator, CategoryActionType } from './actions'
import { CategoryModel } from './interface'

const initialState: CategoryModel.State = {
  items: {},
}

export const categories: Reducer<CategoryModel.State, CoreAction> = (
  state = initialState,
  action
): CategoryModel.State => {
  switch (action.type) {
    case CategoryActionType.CREATE: {
      const { payload } = action as ReturnType<typeof CategoryActionCreator.create>

      return {
        ...state,
        items: {
          ...state.items,
          [payload.id]: payload,
        },
      }
    }
    case CategoryActionType.UPDATE: {
      const {
        payload: { id, name },
      } = action as ReturnType<typeof CategoryActionCreator.update>

      return {
        ...state,
        items: {
          ...state.items,
          [id]: {
            ...state.items[id],
            name,
          },
        },
      }
    }
    case CategoryActionType.REMOVE: {
      const {
        payload: { categoryId },
      } = action as ReturnType<typeof CategoryActionCreator.remove>

      const { [categoryId]: _removed, ...items } = state.items

      return {
        ...state,
        items,
      }
    }
    default: {
      return state
    }
  }
}
