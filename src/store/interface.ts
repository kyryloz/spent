import { RouterState } from 'connected-react-router'
import { AccountModel } from 'store/model/account/interface'
import { CategoryModel } from 'store/model/category/interface'
import { CommandAction } from 'store/model/command/actions'
import { CommandModel } from 'store/model/command/interface'
import { SmartInputAction } from 'store/model/ui/smartInput/actions'
import { SmartInputModel } from 'store/model/ui/smartInput/interface'
import { EvaluationAction } from './evaluation/actions'

export namespace App {
  export interface State {
    readonly router: RouterState
    readonly entities: {
      readonly accounts: AccountModel.State
      readonly categories: CategoryModel.State
    }
    readonly ui: {
      readonly smartInput: SmartInputModel.State
    }
    readonly commands: CommandModel.State
  }

  export type Action = CommandAction | SmartInputAction | EvaluationAction

  export interface Identifiable {
    id: string
  }
}
