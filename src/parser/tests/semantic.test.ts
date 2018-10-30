import { parse } from '../parser';
import { evaluateAction, EvaluateActionCallback } from '../semantic';

describe('semantic.ts', () => {
  describe('runSemantic()', () => {

    const mockCallback: EvaluateActionCallback = {
      create: jest.fn(),
      expense: jest.fn(),
      income: jest.fn(),
      status: jest.fn()
    }

    beforeEach(() => {
      jest.resetAllMocks()
    })

    test('expense', () => {
      const input = "expense 100.10 on 'some goods' from 'My Wallet'"
      evaluateAction(parse(input), mockCallback)
      expect(mockCallback.expense).toBeCalledWith('some goods', 100.1, 'My Wallet')
    })

    test('income', () => {
      const input = "income 100.010 to 'My Wallet'"
      evaluateAction(parse(input), mockCallback)
      expect(mockCallback.income).toBeCalledWith('My Wallet', 100.01)
    })

    test('create', () => {
      const input = "create account 'My Wallet'"
      evaluateAction(parse(input), mockCallback)
      expect(mockCallback.create).toBeCalledWith('account', 'My Wallet')
    })

    test('status', () => {
      const input = 'status transactions'
      evaluateAction(parse(input), mockCallback)
      expect(mockCallback.status).toBeCalledWith('transactions')
    })
  })
})
