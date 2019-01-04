import { AccountActionCreator } from '../../account/actions'
import { CategoryActionCreator, CategoryActionType } from '../actions'
import { categories } from '../reducer'

describe('categories reducer', () => {
  it('should return the initial state', () => {
    expect(categories(undefined, AccountActionCreator.create(''))).toEqual({
      items: {},
    })
  })

  it('should handle CREATE', () => {
    const createCategory1: ReturnType<typeof CategoryActionCreator.create> = {
      type: CategoryActionType.CREATE,
      payload: {
        id: '1',
        createdAt: 1,
        name: 'category1',
      },
    }

    const createCategory2: ReturnType<typeof CategoryActionCreator.create> = {
      type: CategoryActionType.CREATE,
      payload: {
        id: '2',
        createdAt: 2,
        name: 'category2',
      },
    }
    let state = categories(undefined, createCategory1)
    state = categories(state, createCategory2)

    const expectedState = {
      items: {
        '1': {
          id: '1',
          createdAt: 1,
          name: 'category1',
        },
        '2': {
          id: '2',
          createdAt: 2,
          name: 'category2',
        },
      },
    }

    expect(state).toEqual(expectedState)
  })

  it('should handle UPDATE', () => {
    const createCategory1: ReturnType<typeof CategoryActionCreator.create> = {
      type: CategoryActionType.CREATE,
      payload: {
        id: '1',
        createdAt: 1,
        name: 'category1',
      },
    }

    const createCategory2: ReturnType<typeof CategoryActionCreator.create> = {
      type: CategoryActionType.CREATE,
      payload: {
        id: '2',
        createdAt: 2,
        name: 'category2',
      },
    }

    const updateCategory1: ReturnType<typeof CategoryActionCreator.update> = {
      type: CategoryActionType.UPDATE,
      payload: {
        id: '1',
        name: 'category1_updated',
      },
    }

    let state = categories(undefined, createCategory1)
    state = categories(state, createCategory2)
    state = categories(state, updateCategory1)

    const expectedState = {
      items: {
        '1': {
          id: '1',
          createdAt: 1,
          name: 'category1_updated',
        },
        '2': {
          id: '2',
          createdAt: 2,
          name: 'category2',
        },
      },
    }

    expect(state).toEqual(expectedState)
  })

  it('should handle REMOVE', () => {
    const createCategory1: ReturnType<typeof CategoryActionCreator.create> = {
      type: CategoryActionType.CREATE,
      payload: {
        id: '1',
        createdAt: 1,
        name: 'category1',
      },
    }

    const createCategory2: ReturnType<typeof CategoryActionCreator.create> = {
      type: CategoryActionType.CREATE,
      payload: {
        id: '2',
        createdAt: 2,
        name: 'category2',
      },
    }

    const removeCategory1: ReturnType<typeof CategoryActionCreator.remove> = {
      type: CategoryActionType.REMOVE,
      payload: {
        categoryId: '1',
      },
    }

    let state = categories(undefined, createCategory1)
    state = categories(state, createCategory2)
    state = categories(state, removeCategory1)

    const expectedState = {
      items: {
        '2': {
          id: '2',
          createdAt: 2,
          name: 'category2',
        },
      },
    }

    expect(state).toEqual(expectedState)
  })
})
