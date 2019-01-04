import { AccountAction } from './store/account/actions'
import { AccountModel } from './store/account/interface'
import { CategoryAction } from './store/category/actions'
import { CategoryModel } from './store/category/interface'
import { TransactionAction } from './store/transactions/actions'
import { TransactionModel } from './store/transactions/interface'

export { AccountActionCreator, AccountActionType } from './store/account/actions'
export { AccountModel } from './store/account/interface'
export { AccountSelector } from './store/account/selectors'
export { CategoryActionCreator, CategoryActionType } from './store/category/actions'
export { CategoryModel } from './store/category/interface'
export { CategorySelector } from './store/category/selectors'
export { coreReducer } from './store/coreReducer'
export { TransactionActionCreator, TransactionActionType } from './store/transactions/actions'
export { TransactionModel } from './store/transactions/interface'
export { TransactionSelector } from './store/transactions/selectors'

export type CoreAction = TransactionAction | AccountAction | CategoryAction

export interface CoreState {
  readonly accounts: AccountModel.State
  readonly categories: CategoryModel.State
  readonly transactions: TransactionModel.State
}
