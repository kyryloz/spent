// create account 'Wallet'
// create category 'Groceries'
// expence 100 on 'Groceries' from 'Credit Card'
// income 100 to 'Wallet'
// transfer 100 from 'Credit Card' to 'Wallet'

export namespace Grammar {
  export const STRING_VALUE_PATTERN = /^[a-zA-Z0-9\-_@#\s:]+$/

  export type Keyword =
    | 'expence'
    | 'income'
    | 'on'
    | 'budget'
    | 'transfer'
    | 'create'
    | 'account'
    | 'category'
    | 'to'
    | 'from'
    | 'save'
    | 'restore'
    | 'undo'
    | 'redo'

  export type ActionWord = 'expence' | 'income' | 'transfer' | 'create'

  export type PrepositionWord = 'on' | 'to' | 'from'

  export type EntityWord = 'account' | 'category'

  export enum ExpressionType {
    KEYWORD = 'keyword',
    ENTITY = 'entity',
    FUNCTION = 'function',
    VALUE = 'value',
  }
}
