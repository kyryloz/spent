import { CommandModel } from 'store/model/command/interface'

export type EvaluationAction = ReturnType<typeof EvaluationActionCreator.status>

export enum EvaluationActionType {
  STATUS = '@@evaluation/STATUS',
}

export namespace EvaluationActionCreator {
  export const status = (entity: CommandModel.Entity) => {
    return {
      type: EvaluationActionType.STATUS,
      payload: {
        entity,
      },
    }
  }
}
