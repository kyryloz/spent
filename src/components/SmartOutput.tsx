import { createStyles, List, Theme, WithStyles, withStyles } from '@material-ui/core'
import * as React from 'react'
import { compose, pure, setDisplayName, withHandlers, withState } from 'recompose'
import { withConnectedProps } from '../hoc/withConnectedProps'
import { Commands } from '../store/commands/interface'
import { commandsSelector } from '../store/commands/selectors'
import { App } from '../store/interface'
import { createWidget } from './SmartOutputComponents/widgetFactory'

interface OutterProps {}

interface ConnectedProps {
  commands: Array<Commands.CommandData>
}

interface InnerProps
  extends App.ConnectedComponentProps<ConnectedProps>,
    WithStyles<typeof styles> {}

interface HandlerProps {}

type ViewProps = OutterProps & InnerProps & HandlerProps

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

const View: React.SFC<ViewProps> = ({ commands, classes }) => (
  <div className={classes.root}>
    <List component="nav" className={classes.list}>
      {commands.map(command => (
        <div key={command.id}>{createWidget(command)}</div>
      ))}
    </List>
  </div>
)

export const SmartOutput = compose<ViewProps, OutterProps>(
  withStyles(styles),
  withState('input', 'setInput', ''),
  withConnectedProps<ConnectedProps>(state => ({
    commands: commandsSelector.items(state),
  })),
  withHandlers<OutterProps & InnerProps, HandlerProps>({}),
  pure,
  setDisplayName('SmartOuput')
)(View)
