import { tokenize, normalize } from '../tokenizer'

describe('tokenizer.js', () => {
  describe('tokenize()', () => {
    test('simple input', () => {
      const input = 'create account Wallet'
      const expected = ['create', 'account', 'Wallet']

      expect(tokenize(input)).toEqual(expected)
    })

    test('complex input', () => {
      const input = "  create  account  'My Wallet'"
      const expected = ['create', 'account', 'My Wallet']

      expect(tokenize(input)).toEqual(expected)
    })
  })

  describe('normalize()', () => {
    test('simple input', () => {
      const input = 'create account Wallet'
      const expected = 'create account Wallet'

      expect(normalize(input)).toEqual(expected)
    })

    test('complex input', () => {
      const input = "   create  account   'My  Wallet' "
      const expected = 'create account My~~Wallet'

      expect(normalize(input)).toEqual(expected)
    })
  })
})
