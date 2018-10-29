import { Grammar } from '../grammar/grammar';
import { parse } from '../parser';
import { tokenize } from '../tokenizer';

describe.skip('parser', () => {
  describe('actions', () => {
    describe('create', () => {
      const input = "create account 'Wallet'"
      const expected = {
        type: Grammar.ExpressionType.FUNCTION,
        operator: {
          type: Grammar.ExpressionType.KEYWORD,
          name: 'create',
        },
        args: [
          {
            type: Grammar.ExpressionType.ENTITY,
            name: 'account',
          },
          {
            type: Grammar.ExpressionType.VALUE,
            value: 'Wallet',
          },
        ],
      }

      test('create account', () => {
        expect(parse(tokenize(input))).toEqual(expected)
      })
    })
  })
})
