import { Accounts } from './interface'

export namespace accountsActionCreator {
  export const removeAccount = (id: string): Accounts.Actions.Remove => ({
    type: Accounts.ActionTypes.ACCOUNT_REMOVE,
    payload: {
      id,
    },
  })
}
