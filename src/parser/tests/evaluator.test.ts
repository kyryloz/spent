import { parse } from '../processor/parser'
import { evaluate } from '../processor/evaluator';

describe.skip('evaluator', () => {
  describe('actions', () => {
    describe('create', () => {
      const input = "create account 'Wallet'"
      const expected = "Account 'Wallet' created"

      test('create account', () => {
        expect(evaluate(parse(input))).toEqual(expected)
      })
    })
  })
})
