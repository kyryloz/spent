import { createStyles, List, Theme, withStyles } from '@material-ui/core'
import * as React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Commands } from '../store/commands/interface'
import { commandsSelector } from '../store/commands/selectors'
import { App } from '../store/interface'
import { Classes } from '../utils/styleUtils'
import { createWidget } from './SmartOutputComponents/widgetFactory'

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      height: '100%',
      overflow: 'scroll',
      border: '1px solid #aaaaaa20',
      borderRadius: 5,
      flexDirection: 'column-reverse',
    },
    list: {
      padding: theme.spacing.unit * 2,
    },
  })

interface Props {
  commands: Array<Commands.CommandData>
  classes: Classes<typeof styles>
}

const SmartOutputCmp: React.SFC<Props> = ({ classes, commands }) => (
  <div className={classes.root}>
    <List component="nav" className={classes.list}>
      {commands.map((command: any) => (
        <div key={command.id}>{createWidget(command)}</div>
      ))}
    </List>
  </div>
)

export const SmartOutput = compose(
  connect((state: App.State) => ({
    commands: commandsSelector.items(state),
  })),
  withStyles(styles)
)(SmartOutputCmp)
