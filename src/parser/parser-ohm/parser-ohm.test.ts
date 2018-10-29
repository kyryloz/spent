import { parseInput } from './parser-ohm'

describe('parser-ohm', () => {
  test('parse', () => {
    const input = 'expense 200 on clothes'
    expect(parseInput(input)).toBeTruthy()
  })
})
