import { EvaluationAction } from 'store/evaluation/actions'
import { AccountAction } from '../account/actions'
import { CategoryAction } from '../category/actions'
import { TransactionAction } from '../transactions/actions'

export namespace CommandModel {
  export interface State {
    readonly cliActions: Array<CliCommand>
    readonly error: {
      human: string
    }
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
    readonly action: EvaluationAction | TransactionAction | CategoryAction | AccountAction
  }
}
