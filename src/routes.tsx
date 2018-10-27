import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import { MainPage } from './pages/main/MainPage'

export const Routes = () => (
  <Switch>
    <Route exact={true} path="/" component={MainPage} />
  </Switch>
)
