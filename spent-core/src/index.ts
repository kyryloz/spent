import { AccountAction } from './store/account/actions'
import { AccountModel } from './store/account/interface'
import { CategoryAction } from './store/category/actions'
import { CategoryModel } from './store/category/interface'
import { coreReducer as reducer } from './store/coreReducer'
import { TransactionAction } from './store/transactions/actions'
import { TransactionModel } from './store/transactions/interface'

export * from './store/account/actions'
export * from './store/account/interface'
export * from './store/account/selectors'
export * from './store/category/actions'
export * from './store/category/interface'
export * from './store/category/selectors'
export * from './store/transactions/actions'
export * from './store/transactions/interface'
export * from './store/transactions/selectors'

export type CoreAction = TransactionAction | AccountAction | CategoryAction

export interface CoreState {
  readonly accounts: AccountModel.State
  readonly categories: CategoryModel.State
  readonly transactions: TransactionModel.State
}

export const coreReducer = reducer
