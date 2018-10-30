import { parse } from '../parser'

describe('parser.ts', () => {
  describe('parse', () => {
    describe('expense', () => {
      test('case1', () => {
        const input = 'expense'
        expect(parse(input).succeeded()).toBeFalsy()
      })

      test('case2', () => {
        const input = 'expense 100'
        expect(parse(input).succeeded()).toBeFalsy()
      })

      test('case3', () => {
        const input = 'expense 200 on'
        expect(parse(input).succeeded()).toBeFalsy()
      })
      test('case4', () => {
        const input = 'expense 200 on clothes'
        expect(parse(input).succeeded()).toBeTruthy()
      })

      test('case5', () => {
        const input = "expense 200 on 'clothes'"
        expect(parse(input).succeeded()).toBeTruthy()
      })

      test('case6', () => {
        const input = "expense 200 on 'My Clothes'"
        expect(parse(input).succeeded()).toBeTruthy()
      })

      test('case6', () => {
        const input = 'expense 200 on My Clothes'
        expect(parse(input).succeeded()).toBeFalsy()
      })

      test('case7', () => {
        const input = "expense 200.25 on 'My Clothes'"
        expect(parse(input).succeeded()).toBeTruthy()
      })

      test('case8', () => {
        const input = "expense 100 on '  My Clothes  '"
        expect(parse(input).succeeded()).toBeTruthy()
      })
    })

    describe('create', () => {
      test('case1', () => {
        const input = 'create'
        expect(parse(input).succeeded()).toBeFalsy()
      })

      test('case2', () => {
        const input = 'create account'
        expect(parse(input).succeeded()).toBeFalsy()
      })

      test('case3', () => {
        const input = 'create category'
        expect(parse(input).succeeded()).toBeFalsy()
      })

      test('case4', () => {
        const input = 'create account account'
        expect(parse(input).succeeded()).toBeFalsy()
      })

      test('case5', () => {
        const input = 'create account account1'
        expect(parse(input).succeeded()).toBeTruthy()
      })

      test('case6', () => {
        const input = 'create account account_123asd'
        expect(parse(input).succeeded()).toBeTruthy()
      })

      test('case7', () => {
        const input = "create account 'My Account'"
        expect(parse(input).succeeded()).toBeTruthy()
      })

      test('case8', () => {
        const input = "createaccount ' My Account '"
        expect(parse(input).succeeded()).toBeTruthy()
      })

      test('case9', () => {
        const input = 'create account My Account'
        expect(parse(input).succeeded()).toBeFalsy()
      })

      test('case10', () => {
        const input = 'create account account_#@-123asd'
        expect(parse(input).succeeded()).toBeTruthy()
      })
    })
  })
})
