import * as moment from 'moment';
import { EvaluationAction } from 'store/evaluation/actions';
import { TransactionAction } from 'store/model/transactions/actions';
import { generateId } from 'utils/mathUtils';
import { AccountAction } from '../account/actions';
import { CategoryAction } from '../category/actions';

export type CliAction =
  | ReturnType<typeof CliActionCreator.addCommand>
  | ReturnType<typeof CliActionCreator.removeCommand>

export const enum CliActionType {
  ADD = '@@cli/ADD',
  REMOVE = '@@cli/REMOVE'
}

export namespace CliActionCreator {
  export const addCommand = (
    raw: string,
    action: EvaluationAction | TransactionAction | AccountAction | CategoryAction
  ) => {
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
