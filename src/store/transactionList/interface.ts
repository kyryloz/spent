export const enum TransactionListActionTypes {
  ENTRY_ADD = '@@entries/ENTRY_ADD',
  ENTRY_REMOVE = '@@entries/ENTRY_REMOVE',
}

export interface Transaction {
  id: string
  content: string
}

export interface TransactionListState {
  readonly transactions: Array<Transaction>
}
