import { RouterState } from 'connected-react-router'
import { AccountModel } from 'store/model/account/interface'
import { CategoryModel } from 'store/model/category/interface'
import { CliAction } from 'store/model/cli/actions'
import { CliModel } from 'store/model/cli/interface'
import { SmartInputAction } from 'store/model/ui/cliInput/actions'
import { SmartInputModel } from 'store/model/ui/cliInput/interface'
import { EvaluationAction } from 'store/evaluation/actions'
import { AccountAction } from 'store/model/account/actions'
import { CategoryAction } from 'store/model/category/actions'
import { TransactionAction } from 'store/model/transactions/actions'
import { TransactionModel } from 'store/model/transactions/interface'

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
    readonly commands: CliModel.State
  }

  export type Action =
    | CliAction
    | SmartInputAction
    | EvaluationAction
    | TransactionAction
    | AccountAction
    | CategoryAction

  export interface Identifiable {
    id: string
  }
}
