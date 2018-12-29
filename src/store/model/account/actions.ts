import * as moment from 'moment'
import { generateId } from 'utils/mathUtils'

export type AccountAction =
  | ReturnType<typeof AccountActionCreator.create>
  | ReturnType<typeof AccountActionCreator.update>
  | ReturnType<typeof AccountActionCreator.remove>

export const enum AccountActionType {
  CREATE = '@@account/CREATE',
  UPDATE = '@@account/UPDATE',
  REMOVE = '@@account/REMOVE',
}

export namespace AccountActionCreator {
  export const create = (name: string) => ({
    type: AccountActionType.CREATE,
    payload: {
      id: generateId(),
      createdAt: moment().unix(),
      createdByCommandId: '',
      commandIds: [],
      name,
    },
  })

  export const update = (id: string, name: string) => ({
    type: AccountActionType.UPDATE,
    payload: {
      id,
      name,
    },
  })

  export const remove = (accountId: string) => ({
    type: AccountActionType.CREATE,
    payload: {
      accountId,
    },
  })
}
