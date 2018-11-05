import { Commands } from './interface'
import { normalize } from 'normalizr'
import { commandsSchema } from '../schema';

export namespace commandsActionCreator {
  export const addCommand = <T extends Commands.Command>(command: T): Commands.Actions.Add => {
    let normalized = normalize(command, commandsSchema)
    console.log(command, normalized)
    return {
    type: Commands.ActionTypes.COMMAND_ADD,
    payload: command,
  }
}

  export const removeTransaction = (id: string): Commands.Actions.Remove => ({
    type: Commands.ActionTypes.COMMAND_REMOVE,
    payload: {
      id,
    },
  })
}
