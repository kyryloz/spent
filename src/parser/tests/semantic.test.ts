import { parseGrammar } from 'parser/parser'
import { runSemantic, SemanticCallback } from 'parser/semantic'

describe('semantic.ts', () => {
  describe('runSemantic()', () => {
    const mockCallback: SemanticCallback = {
      create: jest.fn(),
      expense: jest.fn(),
      income: jest.fn(),
      status: jest.fn(),
      remove: jest.fn(),
      rename: jest.fn(),
      updateExpense: jest.fn(),
      updateIncome: jest.fn(),
      transfer: jest.fn(),
      updateTransfer: jest.fn(),
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
      const input = 'status categories'
      runSemantic(parseGrammar(input).match, mockCallback)
      expect(mockCallback.status).toBeCalledWith('categories')
    })

    test('delete', () => {
      const input = 'delete category clothes'
      runSemantic(parseGrammar(input).match, mockCallback)
      expect(mockCallback.remove).toBeCalledWith('category', 'clothes')
    })

    test('rename', () => {
      const input = 'rename category clothes to clothes1'
      runSemantic(parseGrammar(input).match, mockCallback)
      expect(mockCallback.rename).toBeCalledWith('category', 'clothes', 'clothes1')
    })

    test('updateExpense', () => {
      const input =
        "update expense 'c7cb' set amount = 100, account = 'wallet', category = 'clothes', date = '20.12.2018'"
      runSemantic(parseGrammar(input).match, mockCallback)
      expect(mockCallback.updateExpense).toBeCalledWith('c7cb', {
        amount: 100,
        account: 'wallet',
        category: 'clothes',
        date: '20.12.2018',
      })
    })

    test('updateExpense2', () => {
      const input = "update expense 'c7cb' set account = 'wallet'"
      runSemantic(parseGrammar(input).match, mockCallback)
      expect(mockCallback.updateExpense).toBeCalledWith('c7cb', {
        account: 'wallet',
      })
    })

    test('updateIncome', () => {
      const input = "update income 'c7cb' set amount = 100, account = 'wallet', date = '20.12.2018'"
      runSemantic(parseGrammar(input).match, mockCallback)
      expect(mockCallback.updateIncome).toBeCalledWith('c7cb', {
        amount: 100,
        account: 'wallet',
        date: '20.12.2018',
      })
    })

    test('updateIncome2', () => {
      const input = "update income 'c7cb' set account = 'wallet'"
      runSemantic(parseGrammar(input).match, mockCallback)
      expect(mockCallback.updateIncome).toBeCalledWith('c7cb', {
        account: 'wallet',
      })
    })

    test('transfer', () => {
      const input = "transfer 100 from wallet to 'wallet1'"
      runSemantic(parseGrammar(input).match, mockCallback)
      expect(mockCallback.transfer).toBeCalledWith('wallet', 'wallet1', 100)
    })

    test('updateTransfer', () => {
      const input =
        "update transfer id1 set amount = 100, from = wallet, to = 'wallet1', date = '20.12.2018'"
      runSemantic(parseGrammar(input).match, mockCallback)
      expect(mockCallback.updateTransfer).toBeCalledWith('id1', {
        amount: 100,
        from: 'wallet',
        to: 'wallet1',
        date: '20.12.2018',
      })
    })
  })
})
