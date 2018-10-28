import { parse, Syntax } from '../parser';

describe('parser', () => {
  describe('actions', () => {
    describe('create', () => {
      const input = "create (account, 'Wallet')"
      const expected = {
        parsed: {
          type: Syntax.Expression.FUNCTION,
          operator: {
            type: Syntax.Expression.KEYWORD,
            name: 'create',
          },
          args: [
            {
              type: Syntax.Expression.ENTITY,
              name: 'account',
            },
            {
              type: Syntax.Expression.VALUE,
              value: 'Wallet',
            },
          ],
        },
        rest: ''
      }

      test('create account', () => {
        expect(parse(input)).toEqual(expected)
      })
    })
  })
})
