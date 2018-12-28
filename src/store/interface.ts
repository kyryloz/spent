import { RouterState } from 'connected-react-router'
import { AnyAction } from 'redux'
import { AccountModel } from 'store/model/account/interface'
import { CategoryModel } from 'store/model/category/interface'
import { CommandAction } from 'store/model/command/actions'
import { CommandModel } from 'store/model/command/interface'
import { SmartInputAction } from 'store/model/ui/smartInput/actions'
import { SmartInputModel } from 'store/model/ui/smartInput/interface'
import { EvaluationAction } from './evaluation/actions'
import { TransactionAction } from './model/transactions/actions'
import { TransactionModel } from './model/transactions/interface'

export namespace App {
  export interface State {
    readonly router: RouterState
    readonly entities: {
      readonly accounts: AccountModel.State
      readonly categories: CategoryModel.State
      readonly transactions: TransactionModel.State
    }
    readonly ui: {
      readonly smartInput: SmartInputModel.State
    }
    readonly commands: CommandModel.State
  }

  export type Action = CommandAction | SmartInputAction | EvaluationAction | TransactionAction

  export interface Identifiable {
    id: string
  }
}
