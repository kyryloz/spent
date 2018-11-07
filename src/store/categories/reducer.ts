import { Reducer } from 'redux'
import { uuidv4 } from '../../utils/math'
import { Commands } from '../commands/interface'
import { Categories } from './interface'

const initialState: Categories.State = {
  items: [],
}

export const categories: Reducer<Categories.State> = (
  state = initialState,
  action
): Categories.State => {
  switch (action.type) {
    // case Commands.ActionTypes.COMMAND_ADD: {
    //   const actionAdd = action as Commands.Actions.Add
    //   switch (actionAdd.payload.commandType) {
    //     case Commands.CommandType.CREATE_CATEGORY:
    //       const payload = action.payload as Commands.CreateCategory

    //       if (state.items.find(entry => entry.name === payload.data.name)) {
    //         return state
    //       } else {
    //         return {
    //           ...state,
    //           items: [
    //             ...state.items,
    //             { name: payload.data.name, id: uuidv4(), commandIds: [payload.id] },
    //           ],
    //         }
    //       }
    //     default:
    //       return state
    //   }
    // }
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
