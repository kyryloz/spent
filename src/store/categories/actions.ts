import { Categories } from './interface'
import { uuidv4 } from '../../utils/math';

export const addCategory = (name: string): Categories.Actions.Add => ({
  type: Categories.ActionTypes.CATEGORY_ADD,
  payload: {
    id: uuidv4(),
    name,
  },
})

export const removeCategory = (id: string): Categories.Actions.Remove => ({
  type: Categories.ActionTypes.CATEGORY_REMOVE,
  payload: {
    id,
  },
})
