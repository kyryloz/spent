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
        expect(parse(input).succeeded()).toBeTruthy()
      })

      test('case6', () => {
        const input = 'create account account_#@-123asd'
        expect(parse(input).succeeded()).toBeTruthy()
      })

      test('case7', () => {
        const input = 'create account account1'
        expect(parse(input).succeeded()).toBeTruthy()
      })

      test('case8', () => {
        const input = "create account 'account #$!@*(;.'"
        expect(parse(input).succeeded()).toBeTruthy()
      })

      test('case9', () => {
        const input = 'create account #$!@*(;.'
        expect(parse(input).succeeded()).toBeFalsy()
      })

      test('case10', () => {
        const input = 'create account category'
        expect(parse(input).succeeded()).toBeFalsy()
      })

      test('case10', () => {
        const input = 'create account to'
        expect(parse(input).succeeded()).toBeFalsy()
      })
    })

    describe('new lines and spaces', () => {
      test('forbid new lines in strings', () => {
        const input = `create account 'My
        Account'`
        expect(parse(input).succeeded()).toBeFalsy()
      })

      test('allow new lines between operators', () => {
        const input = `create
        account 'My Account'`
        expect(parse(input).succeeded()).toBeTruthy()
      })

      test('allow skip space between operators', () => {
        const input = `createaccount'My Account'`
        expect(parse(input).succeeded()).toBeTruthy()
      })
    })

    describe('commands', () => {
      describe('income', () => {
        test('case1', () => {
          const input = 'income'
          expect(parse(input).succeeded()).toBeFalsy()
        })

        test('case2', () => {
          const input = 'income 200'
          expect(parse(input).succeeded()).toBeFalsy()
        })

        test('case3', () => {
          const input = 'income 200 to'
          expect(parse(input).succeeded()).toBeFalsy()
        })

        test('case4', () => {
          const input = 'income 200 to savings'
          expect(parse(input).succeeded()).toBeTruthy()
        })
      })
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

        test('case7', () => {
          const input = 'expense 200 on clothes from'
          expect(parse(input).succeeded()).toBeFalsy()
        })

        test('case7', () => {
          const input = 'expense 200 on clothes from wallet'
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

      describe('status', () => {
        test('case1', () => {
          const input = 'status transactions'
          expect(parse(input).succeeded()).toBeTruthy()
        })

        test('case2', () => {
          const input = 'status accounts'
          expect(parse(input).succeeded()).toBeTruthy()
        })
      })
    })
  })
})
