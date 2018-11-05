import { schema } from 'normalizr'

export const accountsSchema = new schema.Entity('data', undefined, {
  idAttribute: 'accountName',
})

export const categoriesSchema = new schema.Entity('categories', undefined, {
  idAttribute: 'categoryName',
})

export const commandsSchema = new schema.Entity('commands', {
  data: accountsSchema,
})

export const commandsListSchema = new schema.Array(commandsSchema)
