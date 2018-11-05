import { uuidv4 } from '../../utils/math'
import { Accounts } from './interface'

export namespace accountsActionCreator {
  export const addAccount = (name: string): Accounts.Actions.Add => ({
    type: Accounts.ActionTypes.ACCOUNT_ADD,
    payload: {
      id: uuidv4(),
      name,
      commandIds: []
    },
  })

  export const removeAccount = (id: string): Accounts.Actions.Remove => ({
    type: Accounts.ActionTypes.ACCOUNT_REMOVE,
    payload: {
      id,
    },
  })
}
