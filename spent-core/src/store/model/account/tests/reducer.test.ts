import { AccountActionCreator, AccountActionType } from 'store/model/account/actions'
import { CategoryActionCreator } from 'store/model/category/actions'
import { accounts } from '../reducer'

describe('accounts reducer', () => {
  it('should return the initial state', () => {
    expect(accounts(undefined, CategoryActionCreator.create(''))).toEqual({
      items: {},
    })
  })

  it('should handle CREATE', () => {
    const createAccount1: ReturnType<typeof AccountActionCreator.create> = {
      type: AccountActionType.CREATE,
      payload: {
        id: '1',
        createdAt: 1,
        name: 'account1',
      },
    }

    const createAccount2: ReturnType<typeof AccountActionCreator.create> = {
      type: AccountActionType.CREATE,
      payload: {
        id: '2',
        createdAt: 2,
        name: 'account2',
      },
    }
    let state = accounts(undefined, createAccount1)
    state = accounts(state, createAccount2)

    const expectedState = {
      items: {
        '1': {
          id: '1',
          createdAt: 1,
          name: 'account1',
        },
        '2': {
          id: '2',
          createdAt: 2,
          name: 'account2',
        },
      },
    }

    expect(state).toEqual(expectedState)
  })

  it('should handle UPDATE', () => {
    const createAccount1: ReturnType<typeof AccountActionCreator.create> = {
      type: AccountActionType.CREATE,
      payload: {
        id: '1',
        createdAt: 1,
        name: 'account1',
      },
    }

    const createAccount2: ReturnType<typeof AccountActionCreator.create> = {
      type: AccountActionType.CREATE,
      payload: {
        id: '2',
        createdAt: 2,
        name: 'account2',
      },
    }

    const updateAccount1: ReturnType<typeof AccountActionCreator.update> = {
      type: AccountActionType.UPDATE,
      payload: {
        id: '1',
        name: 'account1_updated',
      },
    }

    let state = accounts(undefined, createAccount1)
    state = accounts(state, createAccount2)
    state = accounts(state, updateAccount1)

    const expectedState = {
      items: {
        '1': {
          id: '1',
          createdAt: 1,
          name: 'account1_updated',
        },
        '2': {
          id: '2',
          createdAt: 2,
          name: 'account2',
        },
      },
    }

    expect(state).toEqual(expectedState)
  })

  it('should handle REMOVE', () => {
    const createAccount1: ReturnType<typeof AccountActionCreator.create> = {
      type: AccountActionType.CREATE,
      payload: {
        id: '1',
        createdAt: 1,
        name: 'account1',
      },
    }

    const createAccount2: ReturnType<typeof AccountActionCreator.create> = {
      type: AccountActionType.CREATE,
      payload: {
        id: '2',
        createdAt: 2,
        name: 'account2',
      },
    }

    const removeAccount1: ReturnType<typeof AccountActionCreator.remove> = {
      type: AccountActionType.REMOVE,
      payload: {
        accountId: '1',
      },
    }

    let state = accounts(undefined, createAccount1)
    state = accounts(state, createAccount2)
    state = accounts(state, removeAccount1)

    const expectedState = {
      items: {
        '2': {
          id: '2',
          createdAt: 2,
          name: 'account2',
        },
      },
    }

    expect(state).toEqual(expectedState)
  })
})
