import * as React from 'react'
import { ViewProps } from '.'
import { createWidget } from './components/widgetFactory'
import { List } from '@material-ui/core';

export const SmartOutputView: React.SFC<ViewProps> = ({ transactions, classes }) => (
  <div className={classes.root}>
    <List component="nav">
      {transactions.map(t => (
        <div key={t.id}>{createWidget(t)}</div>
      ))}
    </List>
  </div>
)
