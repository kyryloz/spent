import * as React from 'react'
import { ViewProps } from '.'
import { createWidget } from './components/widgetFactory'
import { List } from '@material-ui/core';

export const SmartOutputView: React.SFC<ViewProps> = ({ commands, classes }) => (
  <div className={classes.root}>
    <List component="nav">
      {commands.map(command => (
        <div key={command.id}>{createWidget(command)}</div>
      ))}
    </List>
  </div>
)
