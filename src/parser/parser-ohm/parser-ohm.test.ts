import { parseInput } from './parser-ohm'

describe('parser-ohm', () => {
  test('parse', () => {
    const input = 'Holaa'
    expect(parseInput(input)).toBeTruthy()
  })
})
