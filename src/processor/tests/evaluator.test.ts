import { parse } from '../parser'
import { evaluate } from '../evaluator';

describe('evaluator', () => {
  describe('actions', () => {
    describe('create', () => {
      const input = "create(account, 'Wallet')"
      const expected = "Account 'Wallet' created"

      test('create account', () => {
        expect(evaluate(parse(input))).toEqual(expected)
      })
    })
  })
})
