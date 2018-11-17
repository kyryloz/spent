import { createStyles, List, Theme, WithStyles, withStyles } from '@material-ui/core'
import * as React from 'react'
import { connect } from 'react-redux'
import { Commands } from '../store/commands/interface'
import { commandsSelector } from '../store/commands/selectors'
import { App } from '../store/interface'
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

const View = withStyles(styles)(({ commands, classes }: ViewProps) => (
  <div className={classes.root}>
    <List component="nav" className={classes.list}>
      {commands.map(command => (
        <div key={command.id}>{createWidget(command)}</div>
      ))}
    </List>
  </div>
))

interface Props {
  commands: Array<Commands.CommandData>
}

interface State {}

interface ViewProps extends WithStyles<typeof styles>, Props {}

class SmartOutputCmp extends React.PureComponent<Props, State> {
  render() {
    return <View {...this.props} />
  }
}

const mapStateToProps = (state: App.State) => ({
  commands: commandsSelector.items(state),
})

export const SmartOutput = connect(mapStateToProps)(SmartOutputCmp)
