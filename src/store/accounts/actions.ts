import { Accounts } from './interface'

export const addAccount = (name: string, balance: number): Accounts.Actions.Add => ({
  type: Accounts.ActionTypes.ACCOUNT_ADD,
  payload: {
    name,
    balance,
  },
})

export const removeAccount = (id: string): Accounts.Actions.Remove => ({
  type: Accounts.ActionTypes.ACCOUNT_REMOVE,
  payload: id,
})

export const errorTransaction = (
  accountName: string,
  amount: number
): Accounts.Actions.BalanceChange => ({
  type: Accounts.ActionTypes.ACCOUNT_BALANCE_CHANGE,
  payload: {
    accountName,
    amount,
  },
})
