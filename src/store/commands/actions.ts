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
    payload: Commands.ExpenseData
  ): Commands.Actions.ExpenseCommand => {
    return {
      type: Commands.ActionTypes.COMMAND_EXPENSE,
      payload,
    }
  }

  export const addIncomeCommand = (
    payload: Commands.IncomeData
  ): Commands.Actions.IncomeCommand => {
    return {
      type: Commands.ActionTypes.COMMAND_INCOME,
      payload,
    }
  }

  export const addCreateAccountCommand = (
    payload: Commands.CreateAccountData
  ): Commands.Actions.CreateAccountCommand => {
    return {
      type: Commands.ActionTypes.COMMAND_CREATE_ACCOUNT,
      payload,
    }
  }

  export const addCreateCategoryCommand = (
    payload: Commands.CreateCategoryData
  ): Commands.Actions.CreateCategoryCommand => {
    return {
      type: Commands.ActionTypes.COMMAND_CREATE_CATEGORY,
      payload,
    }
  }

  export const addStatusCommand = (
    payload: Commands.StatusData
  ): Commands.Actions.StatusCommand => {
    return {
      type: Commands.ActionTypes.COMMAND_STATUS,
      payload,
    }
  }

  export const remove = (id: string): Commands.Actions.Remove => ({
    type: Commands.ActionTypes.COMMAND_REMOVE,
    payload: {
      id,
    },
  })

  export const error = (payload: Commands.ErrorData): Commands.Actions.Error => ({
    type: Commands.ActionTypes.COMMAND_ERROR,
    payload,
  })
}
