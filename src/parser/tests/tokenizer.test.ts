import { tokenize, normalize } from '../tokenizer'

describe('tokenizer', () => {
  describe('tokenize()', () => {
    const input = "  create  account  'My Wallet'"
    const expected = ['create', 'account', "'My Wallet'"]

    test('test', () => {
      expect(tokenize(input)).toEqual(expected)
    })
  })

  describe('normalize()', () => {
    const input = "   create  account   'My  Wallet' "
    const expected = "create account 'My~~Wallet'"

    test('test', () => {
      expect(normalize(input)).toEqual(expected)
    })
  })
})
