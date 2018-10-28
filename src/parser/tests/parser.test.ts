import { parse } from '../parser'
import { Syntax } from '../grammar'

describe.skip('parser', () => {
  describe('actions', () => {
    describe('create', () => {
      const input = "create account 'Wallet'"
      const expected = {
        type: Syntax.ExpressionType.FUNCTION,
        operator: {
          type: Syntax.ExpressionType.KEYWORD,
          name: 'create',
        },
        args: [
          {
            type: Syntax.ExpressionType.ENTITY,
            name: 'account',
          },
          {
            type: Syntax.ExpressionType.VALUE,
            value: 'Wallet',
          },
        ],
      }

      test('create account', () => {
        expect(parse(input)).toEqual(expected)
      })
    })
  })
})
