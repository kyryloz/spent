import { AccountActionCreator } from '@spent/core'
import { cli } from '../reducer'

describe('cli reducer', () => {
  it('should return the initial state', () => {
    expect(cli(undefined, AccountActionCreator.create(''))).toEqual({
      cliActions: [],
    })
  })
})
