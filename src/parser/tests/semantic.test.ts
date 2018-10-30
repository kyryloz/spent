import { parse } from '../parser'
import { runSemantic } from '../semantic'

describe('semantic.ts', () => {
  describe('runSemantic()', () => {
    test('expense', () => {
      const input = "expense 100 on 'some goods' from 'My Wallet'"
      const parseResult = parse(input)
      expect(runSemantic(parseResult)).toBeUndefined()
    })

    test('income', () => {
      const input = "income 100 to 'My Wallet'"
      const parseResult = parse(input)
      expect(runSemantic(parseResult)).toBeUndefined()
    })

    test('create', () => {
      const input = "create account 'My Wallet'"
      const parseResult = parse(input)
      expect(runSemantic(parseResult)).toBeUndefined()
    })

    test('status', () => {
      const input = 'status transactions'
      const parseResult = parse(input)
      expect(runSemantic(parseResult)).toBeUndefined()
    })
  })
})
