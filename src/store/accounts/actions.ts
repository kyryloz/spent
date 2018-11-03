import { uuidv4 } from '../../utils/math'
import { Accounts } from './interface'

export namespace accountsActionCreator {
  export const addAccount = (name: string, balance: number): Accounts.Actions.Add => ({
    type: Accounts.ActionTypes.ACCOUNT_ADD,
    payload: {
      id: uuidv4(),
      name,
      balance,
    },
  })

  export const removeAccount = (id: string): Accounts.Actions.Remove => ({
    type: Accounts.ActionTypes.ACCOUNT_REMOVE,
    payload: {
      id,
    },
  })

  export const changeBalance = (
    accountName: string,
    amount: number
  ): Accounts.Actions.BalanceChange => ({
    type: Accounts.ActionTypes.ACCOUNT_BALANCE_CHANGE,
    payload: {
      accountName,
      amount,
    },
  })
}
