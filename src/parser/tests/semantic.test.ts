import { parseGrammar } from '../parser'
import { runSemantic, SemanticCallback } from '../semantic'

describe('semantic.ts', () => {
  describe('runSemantic()', () => {
    const mockCallback: SemanticCallback = {
      create: jest.fn(),
      expense: jest.fn(),
      income: jest.fn(),
      status: jest.fn(),
    }

    beforeEach(() => {
      jest.resetAllMocks()
    })

    test('expense', () => {
      const input = "expense 100.10 on 'some goods' from 'My Wallet'"
      runSemantic(parseGrammar(input).match, mockCallback)
      expect(mockCallback.expense).toBeCalledWith('some goods', 100.1, 'My Wallet')
    })

    test('income', () => {
      const input = "income 100.010 to 'My Wallet'"
      runSemantic(parseGrammar(input).match, mockCallback)
      expect(mockCallback.income).toBeCalledWith('My Wallet', 100.01)
    })

    test('create', () => {
      const input = "create account 'My Wallet'"
      runSemantic(parseGrammar(input).match, mockCallback)
      expect(mockCallback.create).toBeCalledWith('account', 'My Wallet')
    })

    test('status', () => {
      const input = 'status transactions'
      runSemantic(parseGrammar(input).match, mockCallback)
      expect(mockCallback.status).toBeCalledWith('transactions')
    })
  })
})
