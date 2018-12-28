import { EvaluationActionCreator } from 'store/evaluation/actions'
import { TransactionActionCreator } from '../actions'
import { transactions } from '../reducer'

describe('transactions reducer', () => {
  it('should return the initial state', () => {
    expect(transactions(undefined, EvaluationActionCreator.createAccount('', ''))).toEqual({
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
})
