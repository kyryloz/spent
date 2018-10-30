import { parse } from '../parser'

describe('parser.ts', () => {
  describe('parse', () => {
    test('case1', () => {
      const input = 'expense 200 on clothes'
      expect(parse(input)).toBeTruthy()
    })
  })
})
