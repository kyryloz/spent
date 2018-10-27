export const enum EntriesActionTypes {
  ENTRY_ADD = '@@entries/ENTRY_ADD',
  ENTRY_REMOVE = '@@entries/ENTRY_REMOVE',
}

export interface Entry {
  id: string
  content: string
}

export interface EntriesState {
  readonly entries: Array<Entry>
}
