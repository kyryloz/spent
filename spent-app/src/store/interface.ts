import { CoreAction, CoreState } from '@spent/core'
import { RouterState } from 'connected-react-router'
import { CliAction } from 'store/model/cli/actions'
import { CliModel } from 'store/model/cli/interface'
import { SmartInputAction } from 'store/model/ui/cliInput/actions'
import { SmartInputModel } from 'store/model/ui/cliInput/interface'
import { EvaluationAction } from './evaluation/actions'

export namespace App {
  export interface State {
    readonly router: RouterState
    readonly core: CoreState
    readonly ui: {
      readonly smartInput: SmartInputModel.State
    }
    readonly commands: CliModel.State
  }

  export type Action = CliAction | SmartInputAction | CoreAction | EvaluationAction

  export interface Identifiable {
    id: string
  }
}
