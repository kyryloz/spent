export type CommandAction =
  | ReturnType<typeof CommandsActionCreator.evaluate>
  | ReturnType<typeof CommandsActionCreator.error>
  | ReturnType<typeof CommandsActionCreator.removeCommand>

export const enum CommandsActionTypes {
  COMMAND_EVALUATE = '@@command/EVALUATE',
  COMMAND_ERROR = '@@command/ERROR',
  COMMAND_REMOVE = '@@command/REMOVE',
}

export namespace CommandsActionCreator {
  export const evaluate = () => {
    return {
      type: CommandsActionTypes.COMMAND_EVALUATE,
      payload: {},
    }
  }

  export const removeCommand = (id: string) => ({
    type: CommandsActionTypes.COMMAND_REMOVE,
    payload: {
      id,
    },
  })

  export const error = (human: string) => ({
    type: CommandsActionTypes.COMMAND_ERROR,
    payload: {
      human,
    },
  })
}
