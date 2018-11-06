import { App } from '../store/interface'
import { Store, Dispatch } from 'redux'

const parserMiddleware = (store: Store<App.State, App.Action>) => (next: Dispatch<App.Action>) => (
  action: App.Action
) => {
  console.group(action.type)
  console.info('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  console.groupEnd()
  return result
}
