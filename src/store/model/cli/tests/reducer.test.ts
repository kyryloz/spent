import { AccountActionCreator } from 'store/model/account/actions'
import { commands } from '../reducer'

describe('cli reducer', () => {
  it('should return the initial state', () => {
    expect(commands(undefined, AccountActionCreator.create(''))).toEqual({
      cliActions: [],
      error: {
        human: '',
      },
    })
  })
})
