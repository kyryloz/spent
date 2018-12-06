import * as ohm from 'ohm-js'

// create account 'Wallet'
// create category 'Groceries'
// expence 100 on 'Groceries' from 'Credit Card'
// income 100 to 'Wallet'
// transfer 100 from 'Credit Card' to 'Wallet'
// update transaction 'c7cb' set amount = 100, account = 'wallet', category = 'clothes'

const keywords = [
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
  'update',
]

// https://ohmlang.github.io/editor/#2aaa2dcbb7a1ee5f5c676a77f7fe1d89
export const grammar = ohm.grammar(`
  Spent {
    Command =
      | Create
      | Expense
      | Income
      | Status
      | Delete
      | Rename
      | UpdateExpense
      | UpdateIncome

    Create            = "create" entity identifier
    Expense           = "expense" number "on" category "from" account
    Income            = "income" number "to" account
    Status            = "status" status
    Delete            = "delete" deletableEntity identifier
    Rename            = "rename" entity identifier "to" identifier
    UpdateExpense     = "update expense" identifier "set" ExpenseSetters
    UpdateIncome      = "update income" identifier "set" IncomeSetters

    ExpenseSetters = NonemptyListOf<ExpenseSetter, ",">

    ExpenseSetter =
      | "amount" "=" number
      | "account" "=" identifier
      | "category" "=" identifier

    IncomeSetters = NonemptyListOf<IncomeSetter, ",">

    IncomeSetter =
      | "amount" "=" number
      | "account" "=" identifier

    category (a category)  = identifier
    account (an account)   = identifier

    identifier =
      | word
      | string

    keyword    = (${keywords.map(w => `"${w}"`).join('|')}) ~char

    entity =
      | "account"
      | "category"

    status =
      | "accounts"
      | "categories"

    deletableEntity =
      | "account"
      | "category"
      | "transaction"

    number (an amount)    = digit+ ("." digit+)?          --number
    word                  = ~keyword wordprefix+ alnum*   --word
    string                = "'" char+ "'"
    char                  = ~"\\\\" ~"\\"" ~"'" ~"\\n" any

    wordprefix =
      | letter
      | "_"
      | "-"
      | "@"
      | "#"
  }
`)
