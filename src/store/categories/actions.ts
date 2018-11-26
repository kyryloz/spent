import { App } from 'store/interface'
import { Categories } from 'store/categories/interface'

export namespace categoriesActionCreator {
  export const removeCategory = (payload: Categories.Category): Categories.Actions.Remove => ({
    type: Categories.ActionTypes.CATEGORY_REMOVE,
    payload,
  })
}
