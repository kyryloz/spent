import { checkName } from '../nameChecker'

describe('nameChecker.js', () => {
  describe('checkName()', () => {
    test('case1', () => {
      const input = 'Wallet'

      expect(checkName(input)).toBeTruthy()
    })

    test('case2', () => {
      const input = 'Wallet-42'

      expect(checkName(input)).toBeTruthy()
    })

    test('case3', () => {
      const input = '(Wallet)'

      expect(checkName(input)).toBeFalsy()
    })

    test('case4', () => {
      const input = '%Wallet'

      expect(checkName(input)).toBeFalsy()
    })
  })
})
