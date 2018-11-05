import { Commands } from './interface'

export namespace commandsActionCreator {
  export const addCommand = <T extends Commands.Command>(command: T): Commands.Actions.Add => ({
    type: Commands.ActionTypes.COMMAND_ADD,
    payload: command,
  })

  export const removeTransaction = (id: string): Commands.Actions.Remove => ({
    type: Commands.ActionTypes.COMMAND_REMOVE,
    payload: {
      id,
    },
  })
}
