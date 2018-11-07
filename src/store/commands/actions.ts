import { Commands } from './interface'

export namespace commandsActionCreator {
  export const evaluateInput = (input: string) => {
    return {
      type: Commands.ActionTypes.COMMAND_EVALUATE,
      payload: {
        input,
      },
    }
  }

  export const addExpenseCommand = (
    payload: Commands.ExpensePayload
  ): Commands.Actions.AddExpenseCommand => {
    return {
      type: Commands.ActionTypes.COMMAND_ADD_EXPENSE,
      payload,
    }
  }

  export const addIncomeCommand = (
    payload: Commands.IncomePayload
  ): Commands.Actions.AddIncomeCommand => {
    return {
      type: Commands.ActionTypes.COMMAND_ADD_INCOME,
      payload,
    }
  }

  export const addCreateAccountCommand = (
    payload: Commands.CreateAccountPayload
  ): Commands.Actions.AddCreateAccountCommand => {
    return {
      type: Commands.ActionTypes.COMMAND_ADD_CREATE_ACCOUNT,
      payload,
    }
  }

  export const addCreateCategoryCommand = (
    payload: Commands.CreateCategoryPayload
  ): Commands.Actions.AddCreateCategoryCommand => {
    return {
      type: Commands.ActionTypes.COMMAND_ADD_CREATE_CATEGORY,
      payload,
    }
  }

  export const addStatusCommand = (
    payload: Commands.StatusPayload
  ): Commands.Actions.AddStatusCommand => {
    return {
      type: Commands.ActionTypes.COMMAND_ADD_STATUS,
      payload,
    }
  }

  export const remove = (id: string): Commands.Actions.Remove => ({
    type: Commands.ActionTypes.COMMAND_REMOVE,
    payload: {
      id,
    },
  })
}
