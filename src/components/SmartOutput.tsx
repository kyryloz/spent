import { createStyles, List, Theme, withStyles } from '@material-ui/core'
import { createWidget } from 'components/widgets/widgetFactory'
import { flow } from 'lodash'
import * as React from 'react'
import { connect } from 'react-redux'
import { Commands } from 'store/commands/interface'
import { commandsSelector } from 'store/commands/selectors'
import { App } from 'store/interface'
import { Classes } from 'utils/styleUtils'

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

interface StyleProps {
  classes: Classes<typeof styles>
}

interface StateProps {
  commands: Array<Commands.CommandData>
}

const SmartOutputCmp: React.SFC<StyleProps & StateProps> = ({ classes, commands }) => (
  <div className={classes.root}>
    <List component="nav" className={classes.list}>
      {commands.map((command: any) => (
        <div key={command.id}>{createWidget(command)}</div>
      ))}
    </List>
  </div>
)

export const SmartOutput = flow(
  connect<StateProps, {}, {}, App.State>(state => ({
    commands: commandsSelector.items(state),
  })),
  withStyles(styles)
)(SmartOutputCmp)
