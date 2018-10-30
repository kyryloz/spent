import { parseGrammar } from '../parser'

describe('parser.ts', () => {
  describe('parse()', () => {
    describe('legal identifier', () => {
      test('case1', () => {
        const input = 'create account My Clothes'
        expect(parseGrammar(input).succeeded()).toBeFalsy()
      })

      test('case2', () => {
        const input = "create account 'My Clothes'"
        expect(parseGrammar(input).succeeded()).toBeTruthy()
      })

      test('case3', () => {
        const input = "expense 100 on '  My  Clothes  '"
        expect(parseGrammar(input).succeeded()).toBeTruthy()
      })

      test('case4', () => {
        const input = 'create account account_123asd'
        expect(parseGrammar(input).succeeded()).toBeTruthy()
      })

      test('case5', () => {
        const input = "create account '1My Account'"
        expect(parseGrammar(input).succeeded()).toBeTruthy()
      })

      test('case6', () => {
        const input = 'create account account_#@-123asd'
        expect(parseGrammar(input).succeeded()).toBeTruthy()
      })

      test('case7', () => {
        const input = 'create account account1'
        expect(parseGrammar(input).succeeded()).toBeTruthy()
      })

      test('case8', () => {
        const input = "create account 'account #$!@*(;.'"
        expect(parseGrammar(input).succeeded()).toBeTruthy()
      })

      test('case9', () => {
        const input = 'create account #$!@*(;.'
        expect(parseGrammar(input).succeeded()).toBeFalsy()
      })

      test('case10', () => {
        const input = 'create account category'
        expect(parseGrammar(input).succeeded()).toBeFalsy()
      })

      test('case10', () => {
        const input = 'create account to'
        expect(parseGrammar(input).succeeded()).toBeFalsy()
      })
    })

    describe('new lines and spaces', () => {
      test('forbid new lines in strings', () => {
        const input = `create account 'My
        Account'`
        expect(parseGrammar(input).succeeded()).toBeFalsy()
      })

      test('allow new lines between operators', () => {
        const input = `create
        account 'My Account'`
        expect(parseGrammar(input).succeeded()).toBeTruthy()
      })

      test('allow skip space between operators', () => {
        const input = `createaccount'My Account'`
        expect(parseGrammar(input).succeeded()).toBeTruthy()
      })
    })

    describe('commands', () => {
      describe('income', () => {
        test('case1', () => {
          const input = 'income'
          expect(parseGrammar(input).succeeded()).toBeFalsy()
        })

        test('case2', () => {
          const input = 'income 200'
          expect(parseGrammar(input).succeeded()).toBeFalsy()
        })

        test('case3', () => {
          const input = 'income 200 to'
          expect(parseGrammar(input).succeeded()).toBeFalsy()
        })

        test('case4', () => {
          const input = 'income 200 to savings'
          expect(parseGrammar(input).succeeded()).toBeTruthy()
        })
      })
      describe('expense', () => {
        test('case1', () => {
          const input = 'expense'
          expect(parseGrammar(input).succeeded()).toBeFalsy()
        })

        test('case2', () => {
          const input = 'expense 100'
          expect(parseGrammar(input).succeeded()).toBeFalsy()
        })

        test('case3', () => {
          const input = 'expense 200 on'
          expect(parseGrammar(input).succeeded()).toBeFalsy()
        })

        test('case4', () => {
          const input = 'expense 200 on clothes'
          expect(parseGrammar(input).succeeded()).toBeTruthy()
        })

        test('case5', () => {
          const input = "expense 200 on 'My Clothes'"
          expect(parseGrammar(input).succeeded()).toBeTruthy()
        })

        test('case6', () => {
          const input = "expense 200.25 on 'My Clothes'"
          expect(parseGrammar(input).succeeded()).toBeTruthy()
        })

        test('case7', () => {
          const input = 'expense 200 on clothes from'
          expect(parseGrammar(input).succeeded()).toBeFalsy()
        })

        test('case7', () => {
          const input = 'expense 200 on clothes from wallet'
          expect(parseGrammar(input).succeeded()).toBeTruthy()
        })
      })

      describe('create', () => {
        test('case1', () => {
          const input = 'create'
          expect(parseGrammar(input).succeeded()).toBeFalsy()
        })

        test('case2', () => {
          const input = 'create account'
          expect(parseGrammar(input).succeeded()).toBeFalsy()
        })

        test('case3', () => {
          const input = 'create category'
          expect(parseGrammar(input).succeeded()).toBeFalsy()
        })

        test('case4', () => {
          const input = 'create account Wallet'
          expect(parseGrammar(input).succeeded()).toBeTruthy()
        })

        test('case5', () => {
          const input = "create account 'My Wallet'"
          expect(parseGrammar(input).succeeded()).toBeTruthy()
        })
      })

      describe('status', () => {
        test('case1', () => {
          const input = 'status transactions'
          expect(parseGrammar(input).succeeded()).toBeTruthy()
        })

        test('case2', () => {
          const input = 'status accounts'
          expect(parseGrammar(input).succeeded()).toBeTruthy()
        })
      })
    })
  })
})
