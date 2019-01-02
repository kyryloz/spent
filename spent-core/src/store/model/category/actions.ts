import * as moment from 'moment'
import { generateId } from 'utils/mathUtils'

export type CategoryAction =
  | ReturnType<typeof CategoryActionCreator.create>
  | ReturnType<typeof CategoryActionCreator.update>
  | ReturnType<typeof CategoryActionCreator.remove>

export const enum CategoryActionType {
  CREATE = '@@category/CREATE',
  UPDATE = '@@category/UPDATE',
  REMOVE = '@@category/REMOVE',
}

export namespace CategoryActionCreator {
  export const create = (name: string) => ({
    type: CategoryActionType.CREATE,
    payload: {
      id: generateId(),
      createdAt: moment().unix(),
      name,
    },
  })

  export const update = (id: string, name: string) => ({
    type: CategoryActionType.UPDATE,
    payload: {
      id,
      name,
    },
  })

  export const remove = (categoryId: string) => ({
    type: CategoryActionType.REMOVE,
    payload: {
      categoryId,
    },
  })
}
