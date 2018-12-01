export type CommandAction =
  | ReturnType<typeof CommandsActionCreator.evaluate>
  | ReturnType<typeof CommandsActionCreator.error>
  | ReturnType<typeof CommandsActionCreator.removeCommand>

export const enum CommandsActionTypes {
  EVALUATE = '@@command/EVALUATE',
  ERROR = '@@command/ERROR',
  COMMAND_REMOVE = '@@command/REMOVE',
}

export namespace CommandsActionCreator {
  export const evaluate = () => {
    return {
      type: CommandsActionTypes.EVALUATE,
    }
  }

  export const removeCommand = (id: string) => ({
    type: CommandsActionTypes.COMMAND_REMOVE,
    payload: {
      id,
    },
  })

  export const error = (human: string) => ({
    type: CommandsActionTypes.ERROR,
    payload: {
      human,
    },
  })
}
