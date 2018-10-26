import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import { MainPageContainer } from './pages/main/MainPageContainer'

export const Routes = () => (
  <Switch>
    <Route exact={true} path="/" component={MainPageContainer} />
  </Switch>
)
