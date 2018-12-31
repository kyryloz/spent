import { AccountActionCreator } from 'store/model/account/actions'
import { TransactionActionCreator } from '../actions'
import { transactions } from '../reducer'

describe('transactions reducer', () => {
  it('should return the initial state', () => {
    expect(transactions(undefined, AccountActionCreator.create(''))).toEqual({
      expenses: {},
      incomes: {},
      transfers: {},
    })
  })

  it('should handle EXPENSE', () => {
    let state = transactions(
      undefined,
      TransactionActionCreator.expense({
        id: '1',
        timestamp: 0,
        accountId: '1',
        categoryId: '1',
        amount: 100,
      })
    )

    state = transactions(
      state,
      TransactionActionCreator.expense({
        id: '2',
        timestamp: 1,
        accountId: '1',
        categoryId: '1',
        amount: 100,
      })
    )

    const expectedState = {
      expenses: {
        '1': {
          id: '1',
          timestamp: 0,
          accountId: '1',
          categoryId: '1',
          amount: 100,
        },
        '2': {
          id: '2',
          timestamp: 1,
          accountId: '1',
          categoryId: '1',
          amount: 100,
        },
      },
      incomes: {},
      transfers: {},
    }

    expect(state).toEqual(expectedState)
  })

  it('should handle INCOME', () => {
    let state = transactions(
      undefined,
      TransactionActionCreator.income({
        id: '1',
        timestamp: 0,
        accountId: '1',
        amount: 100,
      })
    )

    state = transactions(
      state,
      TransactionActionCreator.income({
        id: '2',
        timestamp: 1,
        accountId: '1',
        amount: 100,
      })
    )

    const expectedState = {
      expenses: {},
      incomes: {
        '1': {
          id: '1',
          timestamp: 0,
          accountId: '1',
          amount: 100,
        },
        '2': {
          id: '2',
          timestamp: 1,
          accountId: '1',
          amount: 100,
        },
      },
      transfers: {},
    }

    expect(state).toEqual(expectedState)
  })

  it('should handle TRANSFER', () => {
    let state = transactions(
      undefined,
      TransactionActionCreator.transfer({
        id: '1',
        timestamp: 0,
        fromAccountId: '1',
        toAccountId: '2',
        amount: 100,
      })
    )

    state = transactions(
      state,
      TransactionActionCreator.transfer({
        id: '2',
        timestamp: 1,
        fromAccountId: '1',
        toAccountId: '2',
        amount: 100,
      })
    )

    const expectedState = {
      expenses: {},
      incomes: {},
      transfers: {
        '1': {
          id: '1',
          timestamp: 0,
          fromAccountId: '1',
          toAccountId: '2',
          amount: 100,
        },
        '2': {
          id: '2',
          timestamp: 1,
          fromAccountId: '1',
          toAccountId: '2',
          amount: 100,
        },
      },
    }

    expect(state).toEqual(expectedState)
  })

  it('should handle UPDATE_EXPENSE', () => {
    let state = transactions(
      undefined,
      TransactionActionCreator.expense({
        id: '1',
        timestamp: 0,
        accountId: '1',
        categoryId: '1',
        amount: 100,
      })
    )

    state = transactions(
      state,
      TransactionActionCreator.updateExpense({
        id: '1',
        timestamp: 1,
        accountId: '2',
        categoryId: '2',
        amount: 200,
      })
    )

    const expectedState = {
      expenses: {
        '1': {
          id: '1',
          timestamp: 1,
          accountId: '2',
          categoryId: '2',
          amount: 200,
        },
      },
      incomes: {},
      transfers: {},
    }

    expect(state).toEqual(expectedState)
  })

  it('should handle REMOVE', () => {
    let state = transactions(
      undefined,
      TransactionActionCreator.expense({
        id: '1',
        timestamp: 0,
        accountId: '1',
        categoryId: '1',
        amount: 100,
      })
    )

    state = transactions(
      state,
      TransactionActionCreator.expense({
        id: '2',
        timestamp: 1,
        accountId: '2',
        categoryId: '2',
        amount: 200,
      })
    )

    state = transactions(state, TransactionActionCreator.remove('1'))

    const expectedState = {
      expenses: {
        '2': {
          id: '2',
          timestamp: 1,
          accountId: '2',
          categoryId: '2',
          amount: 200,
        },
      },
      incomes: {},
      transfers: {},
    }

    expect(state).toEqual(expectedState)
  })
})
