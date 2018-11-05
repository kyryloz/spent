import { uuidv4 } from '../../utils/math'
import { Categories } from './interface'

export namespace categoriesActionCreator {
  export const addCategory = (name: string): Categories.Actions.Add => ({
    type: Categories.ActionTypes.CATEGORY_ADD,
    payload: {
      id: uuidv4(),
      name,
      commandIds: []
    },
  })

  export const removeCategory = (id: string): Categories.Actions.Remove => ({
    type: Categories.ActionTypes.CATEGORY_REMOVE,
    payload: {
      id,
    },
  })
}
