import { Dispatch, Store } from 'redux'
import { Accounts } from 'store/accounts/interface'
import { Categories } from 'store/categories/interface'
import { commandsActionCreator } from 'store/commands/actions'
import { App } from 'store/interface'
import { smartInputActionCreator } from 'store/ui/smartInput/actions'

export const cascadeRemoveMiddleware = (store: Store<App.State, App.Action>) => (
  next: Dispatch<App.Action>
) => (action: App.Action) => {
  switch (action.type) {
    case Categories.ActionTypes.CATEGORY_REMOVE:
    case Accounts.ActionTypes.ACCOUNT_REMOVE: {
      const {
        payload: { commandIds },
      } = action as Categories.Actions.Remove | Accounts.Actions.Remove

      commandIds.forEach(id => store.dispatch(commandsActionCreator.remove(id)))
    }
  }

  next(action)
}
