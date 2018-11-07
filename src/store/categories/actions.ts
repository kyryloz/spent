import { Categories } from './interface'

export namespace categoriesActionCreator {
  export const removeCategory = (id: string): Categories.Actions.Remove => ({
    type: Categories.ActionTypes.CATEGORY_REMOVE,
    payload: {
      id,
    },
  })
}
