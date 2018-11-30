import { Accounts } from './accounts/interface'
import { Categories } from './categories/interface'
import { CommandsActions } from './commands/actions'
import { Commands } from './commands/interface'
import { SmartInput } from './ui/smartInput/interface'

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

  export type Action = CommandsActions

  export interface Identifiable {
    id: string
  }
}
