import { CoreAction } from '@spent/core'
import { EvaluationAction } from 'store/evaluation/actions'

export namespace CliModel {
  export interface State {
    readonly cliActions: Array<CliCommand>
  }

  export const enum Entity {
    ACCOUNT = 'account',
    CATEGORY = 'category',
    TRANSACTION = 'transaction',
  }

  export interface CliCommand {
    readonly id: string
    readonly raw: string
    readonly timestamp: number
    readonly action: EvaluationAction | CoreAction
  }
}
