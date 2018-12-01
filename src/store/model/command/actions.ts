export type CommandAction =
  | ReturnType<typeof CommandActionCreator.evaluate>
  | ReturnType<typeof CommandActionCreator.error>
  | ReturnType<typeof CommandActionCreator.removeCommand>

export const enum CommandActionType {
  EVALUATE = '@@command/EVALUATE',
  ERROR = '@@command/ERROR',
  COMMAND_REMOVE = '@@command/REMOVE',
}

export namespace CommandActionCreator {
  export const evaluate = () => {
    return {
      type: CommandActionType.EVALUATE,
    }
  }

  export const removeCommand = (id: string) => ({
    type: CommandActionType.COMMAND_REMOVE,
    payload: {
      id,
    },
  })

  export const error = (human: string) => ({
    type: CommandActionType.ERROR,
    payload: {
      human,
    },
  })
}
