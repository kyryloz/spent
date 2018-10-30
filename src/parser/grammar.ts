import * as ohm from 'ohm-js'

// create account 'Wallet'
// create category 'Groceries'
// expence 100 on 'Groceries' from 'Credit Card'
// income 100 to 'Wallet'
// transfer 100 from 'Credit Card' to 'Wallet'

export const STRING_VALUE_PATTERN = /^[a-zA-Z0-9\-_@#\s:]+$/

export const reservedWords = [
  'expence',
  'income',
  'on',
  'budget',
  'transfer',
  'create',
  'category',
  'to',
  'from',
  'save',
  'restore',
  'load',
  'undo',
  'redo',
  'set',
  'get',
]

export const grammar = ohm.grammar(`
Spent {
  Command =
    | Create
    | Expense
  Create = "create" classicSpace* entity classicSpace* accountName
  Expense = "expense" value "on" categoryName

  categoryName = identifier
  accountName = identifier

  identifier =
    | name
    | nameMultiword

  keyword = ("account" | "category" | "expense") ~nameSuffix
  entity = "account" | "category"
  nameMultiword = "'" classicSpace* name classicSpace* name* classicSpace*"'"

  name = ~keyword letter+ nameSuffix*
  nameSuffix = "_" | "-" | "@" | "#" | alnum

  classicSpace = " "

  value = digit+ ("." digit+)?
}
`)
