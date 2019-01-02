import { CliModel } from 'store/model/cli/interface'

export type EvaluationAction =
  | ReturnType<typeof EvaluationActionCreator.status>
  | ReturnType<typeof EvaluationActionCreator.evaluate>

export enum EvaluationActionType {
  STATUS = '@@evaluation/STATUS',
  EVALUATE = '@@evaluation/EVALUATE',
}

export namespace EvaluationActionCreator {
  export const evaluate = () => {
    return {
      type: EvaluationActionType.EVALUATE,
    }
  }

  export const status = (entity: CliModel.Entity) => {
    return {
      type: EvaluationActionType.STATUS,
      payload: {
        entity,
      },
    }
  }
}
