export type CommandAction =
  | ReturnType<typeof CommandActionCreator.evaluate>
  | ReturnType<typeof CommandActionCreator.error>

export const enum CommandActionType {
  EVALUATE = '@@command/EVALUATE',
  ERROR = '@@command/ERROR',
}

export namespace CommandActionCreator {
  export const evaluate = () => {
    return {
      type: CommandActionType.EVALUATE,
    }
  }

  export const error = (human: string) => ({
    type: CommandActionType.ERROR,
    payload: {
      human,
    },
  })
}
