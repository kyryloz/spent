import * as moment from 'moment'
import { EvaluationAction } from 'store/evaluation/actions'
import { TransactionAction } from 'store/model/transactions/actions'
import { generateId } from 'utils/mathUtils'

export type CommandAction =
  | ReturnType<typeof CommandActionCreator.evaluate>
  | ReturnType<typeof CommandActionCreator.error>
  | ReturnType<typeof CommandActionCreator.addCommand>
  | ReturnType<typeof CommandActionCreator.removeCommand>

export const enum CommandActionType {
  ADD = '@@command/ADD',
  REMOVE = '@@command/REMOVE',
  EVALUATE = '@@command/EVALUATE',
  ERROR = '@@command/ERROR',
}

export namespace CommandActionCreator {
  export const evaluate = () => {
    return {
      type: CommandActionType.EVALUATE,
    }
  }

  export const addCommand = (raw: string, action: EvaluationAction | TransactionAction) => {
    return {
      type: CommandActionType.ADD,
      payload: {
        id: generateId(),
        timestamp: moment().unix(),
        raw,
        action,
      },
    }
  }

  export const removeCommand = (commandId: string) => {
    return {
      type: CommandActionType.REMOVE,
      payload: {
        commandId,
      },
    }
  }

  export const error = (human: string) => ({
    type: CommandActionType.ERROR,
    payload: {
      human,
    },
  })
}
