import { Commands } from './interface'

export namespace commandsActionCreator {
  export const addCommand = (
    commandType: Commands.CommandType,
    id: string,
    timestamp: number,
    raw: string,
    data: any
  ): Commands.Actions.Add => ({
    type: Commands.ActionTypes.COMMAND_ADD,
    payload: {
      commandType,
      id,
      timestamp,
      raw,
      data,
    },
  })

  export const removeTransaction = (id: string): Commands.Actions.Remove => ({
    type: Commands.ActionTypes.COMMAND_REMOVE,
    payload: {
      id,
    },
  })
}
