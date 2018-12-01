import { Accounts } from 'store/model/accounts/interface'
import { Categories } from 'store/model/categories/interface'
import { CommandAction } from 'store/model/commands/actions'
import { Commands } from 'store/model/commands/interface'
import { SmartInput } from 'store/model/ui/smartInput/interface'
import { SmartInputActions } from 'store/model/ui/smartInput/actions'
import { EvaluationAction } from './evaluation/actions';

export namespace App {
  export interface State {
    readonly entities: {
      readonly accounts: Accounts.State
      readonly categories: Categories.State
    }
    readonly ui: {
      readonly smartInput: SmartInput.State
    }
    readonly commands: Commands.State
  }

  export type Action = CommandAction | SmartInputActions | EvaluationAction

  export interface Identifiable {
    id: string
  }
}
