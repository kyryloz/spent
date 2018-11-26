import { Accounts } from './interface'
import { App } from 'store/interface';

export namespace accountsActionCreator {
  export const removeAccount = (payload: Accounts.Account): Accounts.Actions.Remove => ({
    type: Accounts.ActionTypes.ACCOUNT_REMOVE,
    payload,
  })
}
