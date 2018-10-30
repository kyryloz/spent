import { parse } from '../parser'

describe('parser.ts', () => {
  describe('parse()', () => {
    describe('legal identifier', () => {
      test('case1', () => {
        const input = 'create account My Clothes'
        expect(parse(input).succeeded()).toBeFalsy()
      })

      test('case2', () => {
        const input = "create account 'My Clothes'"
        expect(parse(input).succeeded()).toBeTruthy()
      })

      test('case3', () => {
        const input = "expense 100 on '  My  Clothes  '"
        expect(parse(input).succeeded()).toBeTruthy()
      })

      test('case4', () => {
        const input = 'create account account_123asd'
        expect(parse(input).succeeded()).toBeTruthy()
      })

      test('case5', () => {
        const input = "create account '1My Account'"
        expect(parse(input).succeeded()).toBeFalsy()
      })

      test('case6', () => {
        const input = 'create account account_#@-123asd'
        expect(parse(input).succeeded()).toBeTruthy()
      })
    })

    describe('new lines', () => {
      test('forbid new lines in terminals', () => {
        const input = `create account 'My
        Account'`
        expect(parse(input).succeeded()).toBeFalsy()
      })

      test('grant new lines between non-terminals', () => {
        const input = `create
        account 'My Account'`
        expect(parse(input).succeeded()).toBeTruthy()
      })
    })

    describe('commands', () => {
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
          const input = "expense 200 on 'My Clothes'"
          expect(parse(input).succeeded()).toBeTruthy()
        })

        test('case6', () => {
          const input = "expense 200.25 on 'My Clothes'"
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
          const input = 'create account Wallet'
          expect(parse(input).succeeded()).toBeTruthy()
        })

        test('case5', () => {
          const input = "create account 'My Wallet'"
          expect(parse(input).succeeded()).toBeTruthy()
        })
      })
    })
  })
})
