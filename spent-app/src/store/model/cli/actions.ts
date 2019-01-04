import { CoreAction } from '@spent/core'
import * as moment from 'moment'
import { EvaluationAction } from 'store/evaluation/actions'
import { generateId } from 'utils/mathUtils'

export type CliAction =
  | ReturnType<typeof CliActionCreator.addCommand>
  | ReturnType<typeof CliActionCreator.removeCommand>

export const enum CliActionType {
  ADD = '@@cli/ADD',
  REMOVE = '@@cli/REMOVE',
  ERROR = '@@cli/ERROR',
}

export namespace CliActionCreator {
  export const addCommand = (raw: string, action: EvaluationAction | CoreAction) => {
    return {
      type: CliActionType.ADD,
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
      type: CliActionType.REMOVE,
      payload: {
        commandId,
      },
    }
  }
}
